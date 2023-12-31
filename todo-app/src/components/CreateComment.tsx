import React, { ChangeEvent } from "react";

import { selectTaskById } from "../state/selectors";
import { useAppDispatch, useAppSelector } from "../state/hooks";

interface CreateCommentProps {
    taskId?: number
}
const CreateComment = ({taskId}: CreateCommentProps) => {
    const[text, setText] = React.useState('')

    const task = useAppSelector(state => selectTaskById(state, taskId))
    const dispatch = useAppDispatch()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)

    const handleClickButton = () => {
        if (task) {
            dispatch({type: 'tasks/commentAdded', payload: {
                taskId: taskId,
                text: text
            }})
            setText('')
        }
    }

    return (
        <div className="create-comment">
            <hr></hr>
            <input 
                type="text"
                onChange={handleInputChange}
                value={text}
            />
            <button onClick={handleClickButton} className="btn-rnd-corner">Add comment</button>
        </div>
    )
}

export default CreateComment