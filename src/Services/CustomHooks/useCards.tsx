import { useContext } from 'react'
import { BoardData, IContext } from '../../layout/TasksScreen/TasksView'
import { IBoard } from './useBoards'
import { randomID } from '../GlobalFunctions/IDFunctions'
import { saveBoardsToLocalStorage } from '../GlobalFunctions/LocalStorage'

export interface ITasks {
    id: number,
    boardId: number,
    name: string,
    task: string,
    tagId: number[],
}

const useCards = () => {
    const { allBoards, setAllBoards } = useContext(BoardData) as IContext

    //add card
    const addCard = (interactedBoard: IBoard, inputData: any) => {
        const addedCard = {
            id: randomID(),
            boardId: interactedBoard.id,
            name: inputData.inputTitle,
            task: inputData.inputContent,
            tagId: inputData.inputTags,
        }

        let updatedBoard = allBoards.map((mappedBoard, i) => {
            if (mappedBoard.id === interactedBoard.id) {
                return { ...mappedBoard, tasks: [...mappedBoard.tasks, addedCard] }
            } else {
                return mappedBoard
            }
        })

        setAllBoards(updatedBoard)
        saveBoardsToLocalStorage(updatedBoard)
    }

    //update card
    const updateCard = (boardId: number, inputData: any) => {
        const updatedCard = {
            id: inputData.id,
            boardId: boardId,
            name: inputData.inputTitle,
            task: inputData.inputContent,
            tagId: inputData.inputTags,
        }

        let newBoard = allBoards.map((mappedBoard, i) => {
            if (mappedBoard.id === boardId) {
                return {
                    ...mappedBoard,
                    tasks: mappedBoard.tasks.map((mappedTask, i) => {
                        return mappedTask.id === updatedCard.id ? updatedCard : mappedTask
                    })
                }
            } else {
                return mappedBoard
            }
        })

        setAllBoards(newBoard)
        saveBoardsToLocalStorage(newBoard)
    }

    //delete card
    const deleteCard = (boardId: number, cardId: number) => {
        let newBoard = allBoards.map((mappedBoard, i) => {
            if (mappedBoard.id === boardId) {
                return {
                    ...mappedBoard,
                    tasks: mappedBoard.tasks.filter((mappedTask, i) => mappedTask.id !== cardId && mappedTask)
                }
            } else {
                return mappedBoard
            }
        })

        setAllBoards(newBoard)
        saveBoardsToLocalStorage(newBoard)
    }

    return { addCard, updateCard, deleteCard }
}

export default useCards