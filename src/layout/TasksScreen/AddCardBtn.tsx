import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import AddCard from './PopupContent/AddCard'
import { IBoard } from '../../Services/CustomHooks/useBoards'

type Props = {
    interactedBoard: IBoard,
}

const AddCardBtn = ({ interactedBoard }: Props) => {
    const [modalState, setModalState] = useState<boolean>(false)

    const handleOpenAddCardModal = () => {
        setModalState(true)
    }
    return (
        <>
            <Modal
                title="ADD CARD"
                open={modalState}
                footer={
                    null
                }
                onCancel={() => setModalState(false)}>
                <AddCard interactedBoard={interactedBoard} setModalState={setModalState} />
            </Modal>
            <div className="Board_Footer_Add" onClick={handleOpenAddCardModal}>
                <PlusOutlined className="Add_Icon" /> Add Card
            </div>
        </>
    )
}

export default AddCardBtn