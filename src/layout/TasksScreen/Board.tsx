import Card from './Card'
import useBoards, { IBoard } from '../../Services/CustomHooks/useBoards'
import AddCardBtn from './AddCardBtn'
import { useState } from 'react'
import { Input, Popconfirm, Popover, message } from 'antd'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'

type Props = {
    board: IBoard,
    boardDelay?: number,
    aldreadyAnimate?: boolean,
}
const defaultAnimate = { opacity: 0 }
const inAnimate = { opacity: 1 }

const Board = ({ board, boardDelay, aldreadyAnimate }: Props) => {
    console.log(aldreadyAnimate)
    // State
    const [boardName, setBoardName] = useState<string>(board.name)
    const [editMode, setEditMode] = useState<boolean>(false)
    const cardId = board.tasks.map(task => task.id)
    const { changeBoardName, deleteBoard } = useBoards()

    // Change board name
    const onChangeBoardName = () => {
        if (boardName !== '') {
            changeBoardName(board.id, boardName)
        } else {
            setBoardName(board.name)
        }
        setEditMode(false)
    }

    // Delete board
    const onDeleteBoard = () => {
        deleteBoard(board.id)
        message.success('Deleted board successfully')
    }

    // Drag board
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: board.id,
        data: {
            type: "IBoard",
            board
        }
    })

    const returnStyleForDragging = () => {
        const currStyle = CSS.Transform.toString(transform)?.split(' ')

        if (currStyle) {
            const toStringCSS = `${currStyle[0]} ${currStyle[1]} ${currStyle[2]} scaleX(1) scaleY(1)`

            return {
                transition,
                transform: toStringCSS,
            }
        }

        return {
            transition,
            transform: CSS.Transform.toString(transform),
        }

    }

    return (
        <div className='Tasks_Board' style={returnStyleForDragging()} ref={setNodeRef}>
            {
                <div className='board' style={isDragging ? { opacity: '0.25' } : { opacity: 1 }}  >
                    {/* Header */}
                    <div className="Board_Drag"
                        {...attributes}
                        {...listeners}
                    >
                        {/* Drag section ... */}
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>

                    {/* Head content */}
                    <div className='Board_Head'
                    >
                        <div className='Board_Title'>
                            {
                                editMode ?
                                    // Show input box -> editing title
                                    <Input className='editedTitle' value={boardName} onChange={(e) => setBoardName(e.target.value)} tabIndex={0} onBlur={onChangeBoardName} autoFocus maxLength={20} />
                                    :
                                    // Not editing title
                                    <div className="Board_Title_Name" onClick={() => setEditMode(true)}>{board.name}</div>
                            }

                            {/* Count tasks/cards */}
                            <div className="Board_Title_Count">{board.tasks ? board.tasks.length : 0}</div>
                        </div>

                        {/* More options Button */}
                        <Popover trigger="click" placement='bottom' content={
                            <Popconfirm title="Do you want to delete?" onConfirm={onDeleteBoard} placement='right'>
                                <button className='deleteBoardBtn'>Delete</button>
                            </Popconfirm>
                        }>
                            <ul className='Board_Options'>
                                <li className="Board_Options_Dot"></li>
                                <li className="Board_Options_Dot"></li>
                                <li className="Board_Options_Dot"></li>
                            </ul>
                        </Popover>
                    </div>

                    {/* Content */}
                    <div className="Board_CardsContainer">
                        <SortableContext items={cardId} >

                            {board.tasks.map((task, i) =>
                                <motion.div
                                    key={i}
                                    initial={defaultAnimate}
                                    animate={inAnimate}
                                    transition={{ duration: aldreadyAnimate ? 0 : 0.15, delay: aldreadyAnimate ? 0 : boardDelay ? boardDelay * 0.35 + i * 0.25 : 0 }}
                                >
                                    <Card key={i} task={task} />
                                </motion.div>
                            )}
                        </SortableContext>
                    </div>

                    {/* Footer */}
                    <div className="Board_Footer">
                        <AddCardBtn interactedBoard={board} />
                    </div>
                </div>}
        </div>
    )
}

export default Board