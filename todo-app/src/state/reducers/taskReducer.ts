import {AnyAction} from 'redux'
import withMatcher from '../helper'
import { TaskPriority, TaskStatus } from '../../enums'

const initialState = {
    tasks: [],
    comments: []
}

const createActionA = withMatcher((payload: {
        title: string, 
        date: string
    }) => {
    return {
        type: 'tasks/taskAdded',
        payload,
    }
})

const createActionC = withMatcher((payload: number) => {
    return {
        type: 'tasks/taskDeleted',
        payload,
    }
})

const createActionD = withMatcher((payload: {
        id: number, 
        title: string, 
        description: string,
        priority: TaskPriority,
        expDate: string,
        files: string[]
    }) => {
    return {
        type: 'tasks/taskEdited',
        payload
    }
})

const createActionE = withMatcher((payload: {
        headTaskId: number,
        title: string,
        date: string
    }) => {
    return {
        type: 'tasks/subTaskAdded',
        payload
    }
}
)

const createActionF = withMatcher((payload : {
        id: number,
        newStatus: string
    }) => {
        return {
            type: 'tasks/taskStatusChanged',
            payload
        }
    }
)

const createActionG = withMatcher((payload : {
        id: number,
        timeInWork: number
    }) => {
        return {
            type: 'tasks/taskTimeInWork',
            payload
        }
    }
)

const createActionH = withMatcher((payload: {
        id: number,
        fileUrl: string
    }) => {
        return {
            type: 'tasks/filesAdded',
            payload
        }
    }
)

const createActionI = withMatcher((payload: {
        taskId: number,
        text: string
    }) => {
        return {
            type: 'tasks/commentAdded',
            payload
        }
    }
)
const createActionJ = withMatcher((payload : {
        headCommentId: number,
        text: string
    }) => {
        return {
            type: 'tasks/subCommentAdded',
            payload
        }
    }
)

function nextTaskId(tasks: ITask[]) {
    const maxId = tasks.reduce((maxId, task) => Math.max(task.id, maxId), -1)
    return maxId + 1
}

function nextCommentId(comments: IComment[]) {
    const maxId = comments.reduce((maxId, comment) => Math.max(comment.id, maxId), -1)
    return maxId + 1
}

export default function taskReducer(state: TaskState = initialState, action: AnyAction): TaskState {
    if (createActionA.match(action)) {
        return {
            ...state,
            tasks: [
                ...state.tasks,
                {
                    id: nextTaskId(state.tasks),
                    title: action.payload.title,
                    description: '',
                    status: TaskStatus.QUEUE,
                    date: action.payload?.date,
                    dateExp: '',
                    timeInWork: 0,
                    priority: TaskPriority.P_1,
                    subTasks: [],
                    files: [],
                    comments: []
                }
            ]
        }
    }
    if (createActionC.match(action)) {
        return {
            ...state,
            tasks: state.tasks.filter((task: ITask) => task.id !== action.payload)
        }
    }
    if (createActionH.match(action)) {
        return {
            ...state,
            tasks: state.tasks.map((task) => {
                if (task.id !== action.payload?.id) 
                    return task
                return {
                    ...task,
                    files: [...task.files, action.payload.fileUrl]
                }
            })
        }
    }
    if (createActionD.match(action)) {
        return {
            ...state,
            tasks: state.tasks.map(task => {
                if (task.id !== action.payload?.id) {
                    return task
                }
                return {
                    ...task,
                    title: action.payload.title,
                    description: action.payload.description,
                    priority: action.payload.priority,
                    dateExp: action.payload.expDate
                }
            })
        }
    }
    if (createActionE.match(action)) {
        const newSubTask: ITask = {
            id: nextTaskId(state.tasks),
            title: action.payload.title,
            description: '',
            status: TaskStatus.QUEUE,
            date: action.payload?.date,
            dateExp: '',
            timeInWork: 0,
            priority: TaskPriority.P_1,
            subTasks: [],
            files: [],
            comments: []
        }
        const updatedTasks = state.tasks.map((task) => {
            if (task.id === action.payload?.headTaskId) {
                return {
                    ...task,
                    subTasks: [...task.subTasks, newSubTask]
                }
            }
            return task
        })
        return {
            ...state,
            tasks: [
                ...updatedTasks,
                newSubTask
            ]
        }
    }
    if (createActionF.match(action)) {
        return {
            ...state,
            tasks: state.tasks.map(task => {
                if (task.id !== action.payload?.id) {
                    return task
                }
                return {
                    ...task,
                    status: action.payload.newStatus
                }
            })

        }
    }
    if (createActionG.match(action)) {
        return {
            ...state,
            tasks: state.tasks.map(task => {
                if (task.id !== action.payload?.id) {
                    return task
                }
                return {
                    ...task,
                    timeInWork: action.payload.timeInWork
                }
            })
        }
    }
    if (createActionI.match(action)) {
        const newComment: IComment = {
            id: nextCommentId(state.comments),
            text: action.payload.text,
            subComments: []
        }
        return {
            ...state,
            tasks: state.tasks.map((task) => {
                if (task.id !== action.payload.taskId)
                    return task
                return {
                    ...task,
                    comments: [...task.comments, newComment]
                }
            }),
            comments: [
                ...state.comments,
                newComment
            ]
        }
    }
    if (createActionJ.match(action)) {
        const newSubComment: IComment = {
            id: nextCommentId(state.comments),
            text: action.payload.text,
            subComments: []
        }
        const updatedComments = state.comments.map((comment) => {
            if (comment.id === action.payload.headCommentId) {
                return {
                    ...comment,
                    subComments: [...comment.subComments, newSubComment]
                }
            }
            return comment
        })
        return {
            ...state,
            comments: [
                ...updatedComments,
                newSubComment
            ]
        }
    }
    return state
}