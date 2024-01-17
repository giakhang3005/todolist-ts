import Tag from '../../Components/Tag'
import useTags from '../../Services/CustomHooks/useTags'
import useCards from '../../Services/CustomHooks/useCards'
import ViewCard from './PopupContent/ViewCard'
import { useState } from 'react'
import { Popconfirm, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { ITasks } from '../../Services/CustomHooks/useCards'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type Props = {
    task: ITasks
}

const Card = ({ task }: Props) => {
    // State
    const [modalState, setModalState] = useState<boolean>(false)
    const { getTag } = useTags()
    const { deleteCard } = useCards()

    // Delete Card
    const handleDeleteCard = (boardId: number, cardId: number, e: any) => {
        deleteCard(boardId, cardId)
        e.stopPropagation()
        message.success('Deleted Task successfully')
    }

    // Drag
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: task.id,
        data: {
            type: "ITasks",
            task
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <span style={isDragging ? { opacity: '0.3' } : {}}>
            {/* View card Modal */}
            <ViewCard modalState={modalState} setModalState={setModalState} task={task} />

            {/* Card */}
            <div className='Board_Card'
                onClick={() => setModalState(true)}
                style={style} ref={setNodeRef}
            >
                {/* Drag position ... */}
                <ul className="Card_Drag"
                    {...attributes}
                    {...listeners}
                >
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>

                {/* Card display data */}
                <div className='Card_Data'>
                    <div className="Card_Info">
                        <div className="Card_Name">{task.name}</div>
                        <div className="CardTagsContainer">
                            {
                                task.tagId.map((tagId: number) => {
                                    let tag = getTag(tagId)
                                    return (
                                        <Tag key={tagId} color={tag?.color}>{tag?.content}</Tag>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* Delete Btn */}
                    <Popconfirm title="Do you want to delete this task?"
                        onCancel={(event) => event?.stopPropagation()}
                        onConfirm={(e) => handleDeleteCard(task.boardId, task.id, e)}
                    >
                        <div className="Card_Btns" onClick={(event) => event.stopPropagation()}>
                            <DeleteOutlined />
                        </div>
                    </Popconfirm>
                </div>
            </div>
        </span>
    )
}

export default Card