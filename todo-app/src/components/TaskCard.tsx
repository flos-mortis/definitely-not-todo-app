import React from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { RootState } from '../state/store';
import {useDrag} from 'react-dnd'

import Modal from './Modal';
import ModalOpenTask from './ModalOpenTask';
import Timer from './Timer';

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

    const [{isDragging}, drag] = useDrag(() => ({
        type: "taskCard",
        item: {id: task?.id, taskStatus: task?.status}, 
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))

    const timerStatus = () => {
        if (task?.status === 'Development')
            return true
        else return false
    }

    const dispatch = useAppDispatch()

    const handleDelete = () => {
        dispatch({type: 'tasks/taskDeleted', payload: task?.id})
    } 

    const handleModalOpen = () => {
        setModalActive(true)
    }
      
    const handleModalClose = () => {
        setModalActive(false)
    }
    return(
        <li>
            <div>
                {isModalActive && (
                    <Modal isShown={isModalActive} onClose={handleModalClose}>
                        <ModalOpenTask task={task}></ModalOpenTask>
                    </Modal>
                )}
            </div>
            <div className='task-card' ref={drag}>
                <p onClick={handleModalOpen}>{task?.title}</p>
                <p>{task?.priority}</p>
                { 
                    timerStatus() && <Timer isActive={timerStatus()}></Timer>
                }
                <button onClick={handleDelete}>Delete</button>
            </div>
        </li>
    )
}

export default TaskCard