interface ITask {
    id: number,
    title?: string,
    description: string,
    completed: boolean,
    status: string,
    date?: string,
    dateExp?: string, 
    priority: string,
    subTasks: ITask[]
}

type TaskState = {
    tasks: ITask[]
}
