import React from "react";

import { selectCommentById } from "../state/selectors";
import { useAppSelector } from "../state/hooks";

interface CommentProps {
    commentId: number
}

const Comment = ({commentId} : CommentProps) => {
    const comment = useAppSelector(state => selectCommentById(state, commentId))
    return (
        <div>
            <p>{comment?.text}</p>
        </div>
    )
}

export default Comment