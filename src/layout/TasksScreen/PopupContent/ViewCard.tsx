import Tag from '../../../Components/Tag'
import useCards, { ITasks } from '../../../Services/CustomHooks/useCards'
import useTags from '../../../Services/CustomHooks/useTags'
import useBoards from '../../../Services/CustomHooks/useBoards'
import { Modal, Input, Select, message } from 'antd'
import { AlignLeftOutlined, EditOutlined } from '@ant-design/icons'
import { useContext, useState, useEffect } from 'react'
import { IContext, BoardData } from '../TasksView'
import AddTag from './AddTag'
import UpdateTag from './UpdateTag'

type Props = {
    modalState: boolean,
    setModalState: (state: boolean) => void,
    task: ITasks,
}

interface IInputData {
    id: number,
    inputTitle: string,
    inputContent: string,
    inputTags: number[],
}

const ViewCard = ({ modalState, setModalState, task }: Props) => {
    // State
    const { Tags } = useContext(BoardData) as IContext
    const { getTag } = useTags()
    const { getBoard } = useBoards()
    const { updateCard } = useCards()
    const [isAddingTag, setIsAddingTag] = useState<boolean>(false)
    const [isUpdatingTag, setIsUpdatingTag] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [inputData, setInputData] = useState<IInputData>({
        id: task.id,
        inputTitle: task.name,
        inputContent: task.task,
        inputTags: task.tagId,
    })

    const handleClickEdit = () => {
        setInputData({
            id: task.id,
            inputTitle: task.name,
            inputContent: task.task,
            inputTags: task.tagId,
        })
        setEditMode(true)
    }

    //turn off edit mode when user close/open modal
    useEffect(() => {
        setEditMode(false)
    }, [modalState])

    // Save card
    const handleClickSave = () => {
        if (inputData.inputTitle.length > 0 && inputData.inputContent.length > 0 && inputData.inputTags.length > 0) {
            updateCard(task.boardId, inputData)
            setEditMode(false)
        } else {
            message.error('Please do not let any field empty')
        }
    }

    // Changing tags
    const handleTagsChange = (e: any) => {
        setInputData({ ...inputData, inputTags: e })
    }

    return (
        <div className='viewCards'>
            {/* View Card Modal */}
            <Modal
                title={editMode
                    ?
                    <Input onChange={(e) => setInputData({ ...inputData, inputTitle: e.target.value })}
                        value={inputData.inputTitle} className="viewCard_EditInput" />
                    :
                    <div className='viewCard_title' >{task.name}</div>}
                open={modalState}
                footer={
                    //Updating Tag -> Show nothing
                    isUpdatingTag ?
                        <></>
                        :
                        // Is adding tag -> show back btn
                        isAddingTag ?
                            <button className='backBtn addCard_btn' onClick={() => setIsAddingTag(false)}>Back</button>
                            :
                            // is editing other contents -> show save button
                            editMode ?
                                <button className='addCard_btn' onClick={handleClickSave}> SAVE</button>
                                :
                                // Normal -> edit btn
                                <button className='addCard_btn' onClick={handleClickEdit}><EditOutlined /> EDIT</button>
                }
                onCancel={() => setModalState(false)}
            >

                {/* Board name */}
                <div className="viewCard_boardNameTitle"><AlignLeftOutlined className="viewCard_Icon" /> Board</div>
                <div className="viewCard_boardNameContent">{getBoard(task.boardId)?.name}</div>

                {/* Description */}
                <div className="viewCard_descriptTitle"><AlignLeftOutlined className="viewCard_Icon" /> DESCRIPTION</div>
                {
                    editMode
                        ?
                        <Input onChange={(e) => setInputData({ ...inputData, inputContent: e.target.value })}
                            value={inputData.inputContent} className="viewCard_EditInputDetail" />
                        :
                        <div className="viewCard_descriptContent"> {task.task}</div>}

                {/* Tags */}
                {editMode
                    ?
                    // Show title & UpdateTag components handle update
                    isUpdatingTag ?
                        <>
                            <div className="viewCard_descriptTitle"><EditOutlined className="viewCard_Icon" />Updating Tags</div>
                            <div style={{ margin: '0 0 0 32px' }}>
                                <UpdateTag setIsUpdatingTag={setIsUpdatingTag} />
                            </div>
                        </>

                        :
                        // Add tag -> show add tag component
                        isAddingTag ?
                            <div className='addingTagContainer'>
                                <AddTag />
                            </div>
                            :
                            // Normal -> show select box to select tags
                            <>
                                <Select
                                    mode="multiple"
                                    className="viewCard_TagsEdit"
                                    options={Tags.map(tags => ({ label: tags.content, value: tags.id }))}
                                    onChange={(e) => handleTagsChange(e)}
                                    value={inputData.inputTags}
                                />
                                <button className="addTag" onClick={() => setIsUpdatingTag(true)}><EditOutlined /></button>
                                <button className="addTag" onClick={() => setIsAddingTag(true)}>+</button>
                            </>
                    :
                    // Mapping tags
                    <div className="viewCard_tags">
                        {
                            task.tagId.map((tagId: number) => {
                                let tag = getTag(tagId)
                                return (
                                    <Tag key={tagId} color={tag?.color}>{tag?.content}</Tag>
                                )
                            })
                        }
                    </div>}
            </Modal>
        </div>
    )
}

export default ViewCard