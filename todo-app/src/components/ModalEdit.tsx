import React, { ChangeEvent } from 'react'

import Modal from "./Modal"
import { useAppDispatch, useAppSelector } from '../state/hooks'
import Files from './Files'
import { selectTaskById } from '../state/selectors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ModalEditProps {
    id?: number
}

const ModalEdit = ({id}: ModalEditProps) => {
    const[isModalActive, setModalActive] = React.useState(false)
    const[text, setText] = React.useState({
        title: '',
        description: '',
        expDate: ''
    })
    const[selectPriority, setSelectPriority] = React.useState(1)

    const dateInputRef = React.useRef(null)
    
    const date = new Date()
    let currentDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

    const task = useAppSelector(state => selectTaskById(state, id))

    const dispatch = useAppDispatch()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText({
            ...text,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectPriority(Number(e.target.value))
    }

    const handleSaveClick = () => {
        if (task) {
            dispatch({type: 'tasks/taskEdited', payload: {
                id: task.id, 
                title: text.title, 
                description: text.description, 
                priority: selectPriority,
                expDate: text.expDate,
            }})
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
            <button onClick={handleModalOpen} className='btn-edit'>
                <i className="fa-solid fa-pen"></i>
            </button>
            {isModalActive && (
            <Modal isShown={isModalActive} onClose={handleModalClose}>
                <input 
                    placeholder='Title'
                    type='text'
                    name='title'
                    value={text.title}
                    onChange={handleInputChange}
                />
                <input 
                    placeholder='Description'
                    type='text'
                    name='description'
                    value={text.description}
                    onChange={handleInputChange}
                />
                <p>Set expire date</p>
                <input 
                    type='date' 
                    name='expDate' 
                    onChange={handleInputChange} 
                    min={currentDate}
                    ref={dateInputRef}
                />
                <select onChange={handleSelectChange} value={selectPriority}>
                    <option
                        value='1' 
                    >1</option>
                    <option
                        value='2' 
                    >2</option>
                    <option
                        value='3' 
                    >3</option>
                    <option
                        value='4' 
                    >4</option>
                </select>
                <Files taskId={task?.id}></Files>
                <button onClick={handleSaveClick} disabled={text.title.length === 0}>Save</button>
            </Modal>
            )}
        </div>
    )
}

export default ModalEdit