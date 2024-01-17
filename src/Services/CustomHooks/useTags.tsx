import { useContext } from 'react'
import { BoardData, IContext } from '../../layout/TasksScreen/TasksView'
import { randomID } from '../GlobalFunctions/IDFunctions'

export interface ITag {
    id: number,
    content: string,
    color: string,
}

const useTags = () => {
    const { Tags, setTags } = useContext(BoardData) as IContext

    //find tag
    const getTag = (id: number) => {
        return Tags.find(tag => tag.id === id)
    }

    //add tag
    const addTag = (newTag: any) => {
        const addedTag = {
            id: randomID(),
            content: newTag.name,
            color: newTag.color,
        }

        setTags([...Tags, addedTag])
    }

    return { getTag, addTag }
}

export default useTags