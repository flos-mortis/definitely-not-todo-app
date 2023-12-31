interface ITask {
    id: number,
    title: string,
    description: string,
    status: string,
    date: string,
    dateExp: string, 
    timeInWork: number,
    priority: number,
    subTasks: ITask[],
    files: string[],
    comments: IComment[]
}

type TaskState = {
    tasks: ITask[],
    comments: IComment[]
}

interface IComment {
    id: number,
    taskId: number,
    text: string,
    replies: IComment[]
}