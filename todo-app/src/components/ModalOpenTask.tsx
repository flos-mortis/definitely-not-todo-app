import React from "react";

import ModalEdit from "./ModalEdit";
import ModalAddSubtask from "./ModalAddSubtask";

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
            <ModalEdit id={task?.id} key={task?.id}></ModalEdit>
            <ModalAddSubtask headTaskId={task?.id}></ModalAddSubtask>
        </div>
    )
}

export default ModalOpenTask