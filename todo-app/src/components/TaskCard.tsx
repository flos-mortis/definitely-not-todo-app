import React from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { RootState } from '../state/store';

import ModalEdit from './ModalEdit';
import ModalAddSubtask from './ModalAddSubtask';

interface TaskCardProps {
    key: number,
    id: number
}

const selectTaskById = (state: RootState, taskId: number) => {
    return state.tasks.find(task => task.id === taskId)
}

const TaskCard = ({id}: TaskCardProps) => {

    const task = useAppSelector(state => selectTaskById(state, id))

    const dispatch = useAppDispatch()

    const handleCompletedChange = () => {
        if (task)
            dispatch({type: 'tasks/taskToggled', payload: id})
    }

    const onDelete = () => {
        dispatch({type: 'tasks/taskDeleted', payload: task?.id})
    } 

    return(
        <li>
            <div className='task-card'>
                <input 
                    type='checkbox'
                    checked={task?.completed} 
                    onChange={handleCompletedChange} 
                />
                <p>{task?.title}</p>
                <p>{task?.priority}</p>
                <ModalEdit id={task?.id}></ModalEdit>
                <ModalAddSubtask headTaskId={task?.id}></ModalAddSubtask>
                <button onClick={onDelete}>Delete</button>
            </div>
        </li>
    )
}

export default TaskCard