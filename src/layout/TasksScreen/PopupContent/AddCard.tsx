import { Row, Col, Select, Input, message, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import UpdateTag from './UpdateTag'
import { IBoard } from '../../../Services/CustomHooks/useBoards'
import { useContext, useState } from 'react'
import { IContext, BoardData } from '../TasksView'
import "./PopupContent.scss"
import useCards from '../../../Services/CustomHooks/useCards'
import AddTag from './AddTag'

type Props = {
    interactedBoard: IBoard,
    setModalState: (state: boolean) => void
}

interface IInputData {
    board: IBoard,
    inputTitle: string,
    inputContent: string,
    inputTags: number[],
}

const AddCard = ({ interactedBoard, setModalState }: Props) => {
    // State
    const { Tags } = useContext(BoardData) as IContext
    const { addCard } = useCards();
    const [inputData, setInputData] = useState<IInputData>({
        board: interactedBoard,
        inputTitle: '',
        inputContent: '',
        inputTags: [],
    })
    const [isAddingTag, setIsAddingTag] = useState<boolean>(false)
    const [isUpdatingTag, setIsUpdatingTag] = useState<boolean>(false)

    //Changing tag
    const handleTagsChange = (e: any) => {
        setInputData({ ...inputData, inputTags: e })
    }

    // Add new card
    const handleAddCard = () => {
        if (inputData.inputTitle.length > 0 && inputData.inputContent.length > 0 && inputData.inputTags.length > 0) {
            addCard(interactedBoard, inputData)
            setInputData({
                board: interactedBoard,
                inputTitle: '',
                inputContent: '',
                inputTags: [],
            })
            setModalState(false)
            message.success('Added task successfully')
        } else {
            message.error('Please do not let any field empty')
        }
    }

    return (
        <div className='addCard'>
            {/* Board */}
            <Row className='addCard_row'>
                <Col span={8} className='addCard_title'>Board:</Col>
                <Col span={15} className='addCard_content'>{interactedBoard.name}</Col>
            </Row>

            {/* Title */}
            <Row className='addCard_row'>
                <Col span={8} className='addCard_title'>Title:</Col>
                <Col span={15} className='addCard_content'><Input onChange={(e) => setInputData({ ...inputData, inputTitle: e.target.value })} value={inputData.inputTitle} /></Col>
            </Row>

            {/* Content */}
            <Row className='addCard_row'>
                <Col span={8} className='addCard_title'>Content:</Col>
                <Col span={15} className='addCard_content'><Input onChange={(e) => setInputData({ ...inputData, inputContent: e.target.value })} value={inputData.inputContent} /></Col>
            </Row>

            {/* Tag */}
            <Row className='addCard_row'>
                <Col span={8} className='addCard_title'>Tag:</Col>
                <Col span={15} className='addCard_content'>
                    {
                        // Is updating tag
                        isUpdatingTag ?
                            <>
                                <UpdateTag setIsUpdatingTag={setIsUpdatingTag} />
                            </>
                            :
                            // Is adding tag
                            isAddingTag ?
                                <AddTag />
                                :
                                <>
                                    <Select
                                        mode="multiple"
                                        style={{ width: '80%' }}
                                        options={Tags.map(tags => ({ label: tags.content, value: tags.id }))}
                                        onChange={(e) => handleTagsChange(e)}
                                        value={inputData.inputTags}
                                    />
                                    <button className="addTag" onClick={() => setIsUpdatingTag(true)}><EditOutlined /></button>
                                    <button className="addTag" onClick={() => setIsAddingTag(true)}>+</button>
                                </>
                    }
                </Col>
            </Row>
            <Row className='addCard_row'>
                <Col span={8} className='addCard_title'></Col>

                {/* Buttons */}
                <Col span={15} className='addCard_content'>
                    {isUpdatingTag ?
                        <></>
                        : isAddingTag ?
                            <>
                                <button className='backBtn addCard_btn' onClick={() => setIsAddingTag(false)}>Back</button>
                            </>
                            :
                            <button className='addCard_btn' onClick={handleAddCard}>ADD</button>}
                </Col>
            </Row>
        </div>
    )
}

export default AddCard