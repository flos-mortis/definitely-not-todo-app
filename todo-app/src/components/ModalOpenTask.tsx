import React from "react";

import ModalEdit from "./ModalEdit";
import ModalAddSubtask from "./ModalAddSubtask";
import CreateComment from "./CreateComment";

interface ModalOpenTaskProps {
    task?: ITask
}

const ModalOpenTask = ({task}: ModalOpenTaskProps) => {
    return (
        <div>
            <p>Title: {task?.title}</p>
            <p>DescriptioN: {task?.description}</p>
            <p>Date: {task?.date}</p>
            <p>{task?.priority}</p>
            <p>Expire date: {task?.dateExp}</p>
            {
                task?.files?.map((file) => (
                    <img src={file} style={{width: '50px', height: '50px'}}></img>
                ))
            }
            <ModalEdit id={task?.id} key={task?.id}></ModalEdit>
            <ModalAddSubtask headTaskId={task?.id} key={task?.id}></ModalAddSubtask>
            {
                task?.comments.map((comment) => {
                    return (
                        <p>{comment.text}</p>
                    )
                })
            }
            <CreateComment taskId={task?.id} key={task?.id}></CreateComment>
        </div>
    )
}

export default ModalOpenTask