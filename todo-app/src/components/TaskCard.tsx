import React from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks';
import {useDrag} from 'react-dnd'

import Modal from './Modal';
import ModalOpenTask from './ModalOpenTask';
import Timer from './Timer';
import { selectTaskById } from '../state/selectors';
import { TaskStatus } from '../enums';
import ModalEdit from './ModalEdit';

interface TaskCardProps {
    key: number,
    id: number
}

const TaskCard = ({id}: TaskCardProps) => {
    const[isOpenTaskModalActive, setOpenTaskModalActive] = React.useState(false)

    const task = useAppSelector(state => selectTaskById(state, id))

    const [{isDragging}, drag] = useDrag(() => ({
        type: "taskCard",
        item: {id: task?.id, taskStatus: task?.status}, 
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))

    const timerStatus = () => {
        if (task?.status === TaskStatus.DEVELOPMENT)
            return true
        else if(task?.status === TaskStatus.DONE) 
            return false
    }

    const dispatch = useAppDispatch()

    const handleDelete = () => {
        dispatch({type: 'tasks/taskDeleted', payload: task?.id})
    } 

    const handleTaskOpenModalOpen = () => {
        setOpenTaskModalActive(true)
    }
      
    const handleTaskOpenModalClose = () => {
        setOpenTaskModalActive(false)
    }
    return(
        <li>
            <div>
                {isOpenTaskModalActive && (
                    <Modal isShown={isOpenTaskModalActive} onClose={handleTaskOpenModalClose}>
                        <ModalOpenTask task={task}></ModalOpenTask>
                    </Modal>
                )}
            </div>
            <div className='task-card' ref={drag}>
                <p onClick={handleTaskOpenModalOpen} className='task-title'>{task?.title}</p>
                { 
                    !timerStatus() && task?.status === TaskStatus.QUEUE ? null 
                        : <Timer isActive={timerStatus()}></Timer> 
                }
                <div className='task-icons'>
                    <ModalEdit id={task?.id}></ModalEdit>
                    <button onClick={handleDelete} className='btn-delete btn-round'>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </li>
    )
}

export default TaskCard