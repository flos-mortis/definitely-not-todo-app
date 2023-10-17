import {AnyAction} from 'redux'
import withMatcher from '../helper'

const createActionA = withMatcher((payload : {text: string}) => {
    return {
        type: 'comments/commentAdded',
        payload
    }
})

const createActionB = withMatcher((payload : {
        headCommentId: number,
        text: string
    }) => {
        return {
            type: 'comments/subCommentAdded',
            payload
        }
    }
)

const initialState: CommentState = {
    comments: []
}

function nextCommentId(comments: IComment[]) {
    const maxId = comments.reduce((maxId, comment) => Math.max(comment.id, maxId), -1)
    return maxId + 1
}

export default function taskReducer(state: CommentState = initialState, action: AnyAction): CommentState {
    if (createActionA.match(action)) {
        return {
            ...state,
            comments: [
                ...state.comments,
                {
                    id: nextCommentId(state.comments),
                    text: action.payload.text,
                    subComments: []
                }
            ]
        }
    }
    if (createActionB.match(action)) {
        const newSubComment: IComment = {
            id: nextCommentId(state.comments),
            text: action.payload.text,
            subComments: []
        }
        const updatedComments = state.comments.map((comment) => {
            if (comment.id === action.payload?.headCommentId) {
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