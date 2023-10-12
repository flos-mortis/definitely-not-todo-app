import React, { ChangeEvent, KeyboardEvent } from 'react'

import { useAppDispatch } from '../state/hooks'

const CreateTask = () => {
    const [text, setText] = React.useState('')
    const dispatch = useAppDispatch()

    const date = new Date()
    let currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)

    const handleKeyDown = (e: KeyboardEvent) => {
        const trimmedText = (e.target as HTMLInputElement).value.trim()

        if (e.key === "Enter" && trimmedText) {
            dispatch({type: 'tasks/taskAdded', payload: {title: trimmedText, date: currentDate}})
            setText('')
        }
    }  

    return (
        <input
            type='text'
            placeholder='New task'
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    )
}

export default CreateTask