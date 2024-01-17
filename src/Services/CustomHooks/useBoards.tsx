import { ITasks } from "./useCards"
import { BoardData, IContext } from '../../layout/TasksScreen/TasksView'
import { useContext } from "react"
import { randomID } from "../GlobalFunctions/IDFunctions"
import { saveBoardsToLocalStorage } from "../GlobalFunctions/LocalStorage"

export interface IBoard {
    id: number,
    name: string,
    tasks: ITasks[]
}

const useBoards = () => {
    const { allBoards, setAllBoards } = useContext(BoardData) as IContext

    //find board
    const getBoard = (id: number) => {
        return allBoards.find(board => board.id === id)
    }

    //change board name
    const changeBoardName = (boardId: number, newBoardName: string) => {
        let newBoards = allBoards.map((mappedBoard, i) => {
            return mappedBoard.id === boardId ?
                {
                    ...mappedBoard,
                    name: newBoardName
                }
                : mappedBoard
        })

        setAllBoards(newBoards)
        saveBoardsToLocalStorage(newBoards)
    }

    // add new board
    const addBoard = () => {
        const newboard = {
            id: randomID(),
            name: 'Unnamed Board',
            tasks: [],
        }

        setAllBoards([...allBoards, newboard])
        saveBoardsToLocalStorage([...allBoards, newboard])
    }

    // delete board
    const deleteBoard = (boardId: number) => {
        let newBoards = allBoards.filter(board => board.id !== boardId)
        setAllBoards(newBoards)
        saveBoardsToLocalStorage(newBoards)
    }

    return { getBoard, changeBoardName, addBoard, deleteBoard }
}

export default useBoards