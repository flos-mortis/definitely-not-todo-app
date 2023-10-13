import React from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { RootState } from '../state/store';

import ModalEdit from './ModalEdit';
import ModalAddSubtask from './ModalAddSubtask';
import Modal from './Modal';

interface TaskCardProps {
    key: number,
    id: number
}

const selectTaskById = (state: RootState, taskId: number) => {
    return state.tasks.find(task => task.id === taskId)
}

const TaskCard = ({id}: TaskCardProps) => {
    const[isModalActive, setModalActive] = React.useState(false)
    const task = useAppSelector(state => selectTaskById(state, id))

    const dispatch = useAppDispatch()

    const handleCompletedChange = () => {
        if (task)
            dispatch({type: 'tasks/taskToggled', payload: id})
    }

    const handleDelete = () => {
        dispatch({type: 'tasks/taskDeleted', payload: task?.id})
    } 

    const handleModalOpen = () => {
        setModalActive(true)
    }
      
    const handleModalClose = () => {
        setModalActive(false)
        console.log('cllicked')
    }
    return(
        <li>
            <div>
                {isModalActive && (
                    <Modal isShown={isModalActive} onClose={handleModalClose}>
                        <p>Title: {task?.title}</p>
                        <p>DescriptioN: {task?.description}</p>
                        <p>Date: {task?.date}</p>
                        <p>{task?.priority}</p>
                        <ModalEdit id={task?.id}></ModalEdit>
                        <ModalAddSubtask headTaskId={task?.id}></ModalAddSubtask>
                    </Modal>
                )}
            </div>
            <div className='task-card' onClick={handleModalOpen}>
                <input 
                    type='checkbox'
                    checked={task?.completed} 
                    onChange={handleCompletedChange} 
                />
                <p>{task?.title}</p>
                <p>{task?.priority}</p>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </li>
    )
}

export default TaskCard