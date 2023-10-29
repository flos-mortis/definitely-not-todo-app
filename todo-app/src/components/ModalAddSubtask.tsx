import React, { ChangeEvent} from "react";

import Modal from "./Modal";
import { useAppDispatch } from "../state/hooks";

interface ModalAddSubtaskProps {
    headTaskId?: number
}

const ModalAddSubtask = ({headTaskId}: ModalAddSubtaskProps) => {
    const[isModalActive, setModalActive] = React.useState(false)
    const[text, setText] = React.useState('')

    const date = new Date()
    let currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

    const dispatch = useAppDispatch()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)

    const handleAddClick = () => {
        const trimmedText = text.trim()

        if (trimmedText) {
            dispatch({type: 'tasks/subTaskAdded', payload: {
                headTaskId: headTaskId,
                title: trimmedText,
                date: currentDate
            }})
            setText('')
            setModalActive(false)
        }
    }
    
    const handleModalOpen = () => {
        setModalActive(true)
    }
    const handleModalClose = () => {
        setModalActive(false)
    }

    return (
        <div>
            <button onClick={handleModalOpen} className="btn-rnd-corner">Add subtask</button>
            {
                isModalActive && (
                    <Modal isShown={isModalActive} onClose={handleModalClose}>
                        <input 
                            placeholder='Title'
                            type='text'
                            name='title'
                            value={text}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleAddClick} className="btn-rnd-corner">Add</button>
                    </Modal>
                )
            }
        </div>
    )
}

export default ModalAddSubtask