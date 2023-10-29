import React from "react";

import ModalAddSubtask from "./ModalAddSubtask";
import CreateComment from "./CreateComment";
import Comment from "./Comment";

interface ModalOpenTaskProps {
    task?: ITask
}

const ModalOpenTask = ({task}: ModalOpenTaskProps) => {
    return (
        <div className='modal modal-content-child'>
            <div className="task-card-head flex-row">
                <p className="task-status">{task?.status}</p>
                <p className="task-date">{task?.date}</p>
            </div>
            <hr></hr>
            <div className="task-main-info flex-row">
                <p className="task-title">{task?.title}</p>
                <div className={`task-priority-back ${'priority-' + task?.priority}`}>
                    <p className="task-priority">{task?.priority}</p>
                </div>
            </div>
            <p className="task-description">{task?.description}</p>
            <div className="task-expire">
                <i className="fa-solid fa-clock"></i>
                <p className="task-expire-date">{task?.dateExp ? task.dateExp : 'No deadline'}</p>
            </div>
            <div className="files-section">
            {
                task?.files?.map((file) => (
                    <img src={file}></img>
                ))
            }
            </div>
            <hr></hr>
            <div className="comments-section">
                <h4>Comments</h4>
            {
                task?.comments.map((comment) => (
                    <Comment commentId={comment.id} taskId={task.id}></Comment>
                ))
            }
            <CreateComment taskId={task?.id}></CreateComment>
            </div>
            <ModalAddSubtask headTaskId={task?.id}></ModalAddSubtask>
        </div>
    )
}

export default ModalOpenTask