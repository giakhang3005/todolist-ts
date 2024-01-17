import { IBoard } from "../CustomHooks/useBoards"
import { ITag } from "../CustomHooks/useTags"

export const getTagFromLocalStorage = () => {
    const localTag = localStorage.getItem('tag')
    return localTag ? JSON.parse(localTag) : null
}

export const saveTagToLocalStorage = (tag: ITag[]) => {
    localStorage.setItem('tag', JSON.stringify(tag))
}

export const getBoardsFromLocalStorage = () => {
    const localboards = localStorage.getItem('boards')
    return localboards ? JSON.parse(localboards) : null
}

export const saveBoardsToLocalStorage = (boards: IBoard[]) => {
    localStorage.setItem('boards', JSON.stringify(boards))
}