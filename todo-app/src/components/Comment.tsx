import React, { ChangeEvent } from "react";

import { selectCommentById } from "../state/selectors";
import { useAppDispatch, useAppSelector } from "../state/hooks";

interface CommentProps {
    commentId: number,
    taskId: number
}

const Comment = ({commentId, taskId} : CommentProps) => {
    const[visible, setVisible] = React.useState(false)
    const[text, setText] = React.useState('')

    const dispatch = useAppDispatch()

    const handleVisibleInput = () => setVisible(true)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)
    const handleKeyDown = (e: React.KeyboardEvent) => {
        const trimmedText = (e.target as HTMLInputElement).value.trim()

        if (e.key === 'Enter' && trimmedText) {
            dispatch({type: 'tasks/replyAdded', payload: {
                headCommentId: commentId,
                text: trimmedText,
                taskId: taskId
            }})
            setText('')
            setVisible(false)
        }
    }

    const comment = useAppSelector(state => selectCommentById(state, commentId))
    return (
        <div>
            <p>{comment?.text}</p>
            {
                comment?.replies.map((reply) => (
                    <p>{reply.text}</p>
                ))
            }
            <button onClick={handleVisibleInput}>Reply</button>
            {
                visible && (
                    <input
                        type="text"
                        value={text}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                )
            }
        </div>
    )
}

export default Comment