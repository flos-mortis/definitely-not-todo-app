import { RootState } from "./store"

export const selectTaskById = (state: RootState, taskId?: number) => {
    return state.taskReducer.tasks.find(task => task.id === taskId)
}
export const selectTaskByStatus = (state: RootState, title: string) => 
    state.taskReducer.tasks.filter((task: ITask) => task.status === title)

