import { PlusOutlined } from '@ant-design/icons'
import useBoards from '../../Services/CustomHooks/useBoards'

type Props = {}

const AddBoardBtns = (props: Props) => {
    const { addBoard } = useBoards()
    return (
        <div className="AddBoardBtns" onClick={addBoard}>
            <PlusOutlined className="Add_Icon" /> Add Board
        </div>
    )
}

export default AddBoardBtns