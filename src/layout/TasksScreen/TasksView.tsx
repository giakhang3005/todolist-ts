import "./Tasks.scss"
import Board from './Board'
import AddBoardBtns from "./AddBoardBtns"
import { testBoard, testTags } from "../../Data/Board"
import { createContext, useState } from "react"
import { IBoard } from "../../Services/CustomHooks/useBoards"
import { ITag } from "../../Services/CustomHooks/useTags"
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { createPortal } from "react-dom"
import { ITasks } from "../../Services/CustomHooks/useCards"
import Card from "./Card"
import { getBoardsFromLocalStorage, getTagFromLocalStorage, saveBoardsToLocalStorage, saveTagToLocalStorage } from "../../Services/GlobalFunctions/LocalStorage"
import { useEffect } from "react"
import { motion } from 'framer-motion'
// import { message } from "antd"

type Props = {}
const defaultAnimate = { opacity: 0 }
const inAnimate = { opacity: 1 }

// Interfaces
export interface IContext {
  allBoards: IBoard[],
  setAllBoards: (board: IBoard[]) => void,

  setTags: (board: ITag[]) => void,
  Tags: ITag[],
}

export const BoardData = createContext<IContext | null>(null)

const TasksView = (props: Props) => {
  // State
  const [allBoards, setAllBoards] = useState<IBoard[]>(() => {
    const localBoards = getBoardsFromLocalStorage()
    return localBoards ? localBoards : testBoard
  })
  const [Tags, setTags] = useState<ITag[]>(() => {
    const localTags = getTagFromLocalStorage()
    return localTags ? localTags : testTags
  })
  const [isDraggingBoard, setIsDraggingBoard] = useState<IBoard | null>(null)
  const [isDraggingTask, setIsDraggingTask] = useState<ITasks | null>(null)
  const [checkChangeTime, setCheckChangeTime] = useState<number>(0)
  const [aldreadyAnimate, setAlreadyAnimate] = useState<boolean>(false)
  const columnsId = allBoards.map(board => board.id)

  //off animation when finished first load
  const animateTimeOut = setTimeout(() => {
    setAlreadyAnimate(true)
    clearTimeout(animateTimeOut)
  }, (1000 * allBoards.length) / 4)

  // Handle grabbing drag card/board
  const handleDragStart = (e: DragStartEvent) => {
    e.active.data.current?.type === "IBoard" && setIsDraggingBoard(e.active.data.current.board)

    e.active.data.current?.type === "ITasks" && setIsDraggingTask(e.active.data.current.task)
  }

  const handleDragEnd = (e: DragEndEvent) => {
    setIsDraggingBoard(null)
    setIsDraggingTask(null)
    setCheckChangeTime(0)

    const { active, over } = e

    //not Dragging
    if (!over) { return }

    //drag position
    const activeBoardId = active.id
    //drop position
    const overId = over.id

    //not Dragging
    if (activeBoardId === overId) {
      return;
    }

    if (active.data.current?.type === "IBoard") {
      //get index
      const draggingBoardIndex = allBoards.findIndex(board => board.id === activeBoardId)
      const searchOverId = over.data.current?.type === "ITasks" ? over.data.current?.task.boardId : overId
      const swappingBoardIndex = allBoards.findIndex(board => board.id === searchOverId)

      //start swapping
      setAllBoards(arrayMove(allBoards, draggingBoardIndex, swappingBoardIndex))
      saveBoardsToLocalStorage(arrayMove(allBoards, draggingBoardIndex, swappingBoardIndex))
    }
  }

  //Drag over something
  const handleDragOver = (e: DragOverEvent) => {
    // if (checkChangeTime > 8) {
    //   message.error('Please do not spam')
    //   return
    // }
    const { active, over } = e

    //not Dragging
    if (!over) { return }

    //drag position
    const activeTaskdId = active.id
    //drop position
    const overId = over.id

    //not Dragging
    if (activeTaskdId === overId) return;

    //check if task is dragging
    const isActiveTask = active.data.current?.type === "ITasks"
    const isoverTask = over.data.current?.type === "ITasks"

    //Dropping a task over another task
    if (isActiveTask && isoverTask) {
      setCheckChangeTime(prev => prev + 1)

      let clonedAllBoards = allBoards

      const activeBoardIndex = allBoards.findIndex(board => board.id === active.data.current?.task.boardId)
      const overBoardIndex = allBoards.findIndex(board => board.id === over.data.current?.task.boardId)

      const activeTaskIndex = allBoards[activeBoardIndex].tasks.findIndex(task => task.id === activeTaskdId)
      const overTaskIndex = allBoards[activeBoardIndex].tasks.findIndex(task => task.id === overId)


      if (activeBoardIndex === overBoardIndex) {
        //same board
        let swappingAddress = clonedAllBoards[activeBoardIndex].tasks
        const newTasks = arrayMove(swappingAddress, activeTaskIndex, overTaskIndex)
        clonedAllBoards[activeBoardIndex].tasks = newTasks

        setAllBoards(clonedAllBoards)
        saveBoardsToLocalStorage(clonedAllBoards)

      } else {
        //different board
        let activeBoardTask = clonedAllBoards[activeBoardIndex].tasks
        let overBoardTask = clonedAllBoards[overBoardIndex].tasks

        activeBoardTask.splice(activeTaskIndex, 1)
        overBoardTask.splice(overTaskIndex, 0, { ...active.data.current?.task, boardId: clonedAllBoards[overBoardIndex].id })

        setAllBoards(clonedAllBoards)
        saveBoardsToLocalStorage(clonedAllBoards)
      }
    }

    //Dropping a task over another column
    if (isActiveTask && over.data.current?.type === "IBoard") {
      setCheckChangeTime(prev => prev + 1)
      let clonedAllBoards = allBoards

      const activeBoardIndex = allBoards.findIndex(board => board.id === active.data.current?.task.boardId)
      const overBoardIndex = allBoards.findIndex(board => board.id === over.data.current?.board.id)

      const activeTaskIndex = allBoards[activeBoardIndex].tasks.findIndex(task => task.id === activeTaskdId)

      let activeBoardTask = clonedAllBoards[activeBoardIndex].tasks

      activeBoardTask.splice(activeTaskIndex, 1)
      let newTask = { ...active.data.current?.task, boardId: over.data.current?.board.id }
      clonedAllBoards[overBoardIndex].tasks.push(newTask)

      setAllBoards(clonedAllBoards)
      saveBoardsToLocalStorage(clonedAllBoards)
    }
  }

  console.log(allBoards)
  return (
    <BoardData.Provider value={{ allBoards, setAllBoards, setTags, Tags }}>

      <div className='Tasks' >

        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <span style={Object.assign({ display: "flex" }, { alignSelf: 'flex-start' })}>
            <SortableContext items={columnsId}>
              {allBoards.map((board, i) =>
                <motion.div
                  key={i}
                  initial={defaultAnimate}
                  animate={inAnimate}
                  transition={{ duration: aldreadyAnimate ? 0 : 0.15, delay: aldreadyAnimate ? 0 : i * 0.25 }}
                >
                  <Board board={board} boardDelay={i} aldreadyAnimate={aldreadyAnimate} />
                </motion.div>
              )}
            </SortableContext>
          </span>
          {
            createPortal(<DragOverlay>
              {
                isDraggingBoard && <Board board={isDraggingBoard} />
              }
              {
                isDraggingTask && <Card task={isDraggingTask} />
              }
            </DragOverlay>, document.body
            )
          }
        </DndContext>

        {/* Add board */}

        {allBoards.length > 0 && <motion.div
          initial={defaultAnimate}
          animate={inAnimate}
          transition={{ duration: aldreadyAnimate ? 0 : 0.15, delay: aldreadyAnimate ? 0 : allBoards.length * 0.25 }}
        >
          <AddBoardBtns />
        </motion.div>}
      </div>

    </BoardData.Provider>
  )
}

export default TasksView