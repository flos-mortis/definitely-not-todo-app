interface ITask {
    id: number,
    title?: string,
    description: string,
    completed: boolean,
    status: string,
    date?: string,
    priority: string,
    subTasks: ITask[]
}

type TaskState = {
    tasks: ITask[]
}
