interface ITask {
    id: number,
    title: string,
    description: string,
    status: string,
    date: string,
    dateExp?: string, 
    timeInWork?: number,
    priority: string,
    subTasks: ITask[],
    files?: string[]
}

type TaskState = {
    tasks: ITask[]
}
