import "./PopupContent.scss"
import { useContext, useState } from 'react'
import { BoardData, IContext } from "../TasksView"
import { ColorPicker, Input, Popconfirm, message } from "antd"
import { DeleteOutlined } from '@ant-design/icons'

type Props = {
    setIsUpdatingTag: (value: boolean) => void
}

const UpdateTag = ({ setIsUpdatingTag }: Props) => {
    // State
    const { Tags, setTags } = useContext(BoardData) as IContext
    const [tempTags, setTempTags] = useState(Tags)

    // Change tag color
    const handleChangeColor = (i: number, newColor: string) => {
        let newTags = tempTags.map((tag, index) => (
            index === i ? { ...tag, color: newColor } : tag
        ))

        setTempTags(newTags)
    }

    // Change content
    const handleChangeContent = (i: number, newContent: string) => {
        let newTags = tempTags.map((tag, index) => (
            index === i ? { ...tag, content: newContent } : tag
        ))

        setTempTags(newTags)
    }

    // Delete tag
    const handleDelete = (i: number) => {
        let newTags = tempTags.filter((tag, index) => index !== i)
        setTempTags(newTags)
    }

    // Save tag
    const handleSave = () => {
        setIsUpdatingTag(false)
        setTags(tempTags)
        message.success('Updated tags successfully')
    }
    return (
        <div className="updateTagContainer">

            {/* Show temporary tag (before click save) */}
            <ul className="updateTagContainer_list">
                {
                    tempTags.map((tag, i) => (
                        <li key={i}>
                            <Input className="list_name" value={tag.content} onChange={(e) => handleChangeContent(i, e.target.value)}></Input>
                            <ColorPicker className="list_color" value={tag.color} onChange={(e) => handleChangeColor(i, e.toHexString())}></ColorPicker>
                            <Popconfirm title="Do you want to delete?" onConfirm={() => handleDelete(i)}>
                                <DeleteOutlined className="list_delete" />
                            </Popconfirm>
                        </li>
                    ))
                }
            </ul>
            
            {/* Save btn */}
            <div className="updateTagSave" onClick={handleSave}>SAVE</div>
        </div>
    )
}

export default UpdateTag