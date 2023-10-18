import { RootState } from "./store"

export const selectTaskById = (state: RootState, taskId?: number) => {
    return state.tasks.find(task => task.id === taskId)
}
export const selectTaskByStatus = (state: RootState, title: string) => 
    state.tasks.filter((task: ITask) => task.status === title)

