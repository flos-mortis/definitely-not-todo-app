interface ITask {
    id: number,
    title?: string,
    description: string,
    completed: boolean,
    status: string,
    date?: string,
    dateExp?: string, 
    timeInWork?: number,
    priority: string,
    subTasks: ITask[]
}

type TaskState = {
    tasks: ITask[]
}
