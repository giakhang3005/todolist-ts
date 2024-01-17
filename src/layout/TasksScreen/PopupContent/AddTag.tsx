import { Input, ColorPicker, message } from "antd"
import { useState } from "react"
import useTags from "../../../Services/CustomHooks/useTags"
import "./PopupContent.scss"

type Props = {}

interface INewTag {
    color: string,
    name: string
}

const AddTag = (props: Props) => {
    const { addTag } = useTags()

    const [newTag, setNewTag] = useState<INewTag>(
        {
            color: '#809cc4',
            name: ''
        }
    )

    const handleColorChange = (e: any) => {
        setNewTag({
            ...newTag,
            color: e.toHexString(),
        })
    }

    const handleAddCard = () => {
        if (newTag.name === '') {
            message.error('Tag Content can not be empty')
        } else {
            addTag(newTag)
            setNewTag({
                color: '#809cc4',
                name: ''
            })
            message.success('Added tag successfully')
        }
    }

    return (
        <div className='addNewTag'>
            <Input className="addNewTag_tagInput" value={newTag.name} onChange={(e) => setNewTag({ ...newTag, name: e.target.value })} placeholder="Input new tag" />
            <ColorPicker className="addNewTag_colorPicker" value={newTag.color} onChange={(e) => handleColorChange(e)} />
            <button className="addTag" onClick={handleAddCard}>+</button>
        </div>
    )
}

export default AddTag


