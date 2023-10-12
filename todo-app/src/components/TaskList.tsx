import { useAppSelector } from '../state/hooks';

import { RootState } from '../state/store';
import TaskCard from './TaskCard'

interface TaskListProps {
    title: string
}

const selectTaskByStatus = (state: RootState, title: string) => 
    state.tasks.filter((task: ITask) => task.status === title)

const TaskList = (props: TaskListProps) => {
    const tasks = useAppSelector((state) => selectTaskByStatus(state, props.title))

    const taskItems = tasks.map((task: ITask) => {
        return <TaskCard key={task.id} id={task.id} />
    })

    return (
        <ul className='tasks-column'>
            <h3>{props.title}</h3>
            {taskItems}
        </ul>
    )
}

export default TaskList