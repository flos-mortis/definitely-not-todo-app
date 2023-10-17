import { useAppDispatch, useAppSelector } from '../state/hooks';
import {useDrop} from 'react-dnd'

import TaskCard from './TaskCard'
import { selectTaskByStatus } from '../state/selectors';

interface TaskListProps {
    title: string
}

const TaskList = (props: TaskListProps) => {
    const tasks = useAppSelector((state) => selectTaskByStatus(state, props.title))
    const dispatch = useAppDispatch()

    const [{isOver}, drop] = useDrop(() => ({
        accept: "taskCard",
        drop: (item: ITask) => addTaskToColumn(item.id, props.title),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))

    const addTaskToColumn = (id: number, columnTitle: string) => {
        dispatch({type: 'tasks/taskStatusChanged', payload: {
            id: id,
            newStatus: columnTitle
        }})
    }
 
    const taskItems = tasks.map((task: ITask) => {
        return <TaskCard key={task.id} id={task.id} />
    })

    return (
        <ul className='tasks-column' ref={drop}>
            <h3>{props.title}</h3>
            {taskItems}
        </ul>
    )
}

export default TaskList