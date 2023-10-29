import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { ChangeEvent } from 'react'
import { v4 } from 'uuid'

import storage from '../firebase'
import { useAppDispatch } from '../state/hooks'

interface FilesProps {
    taskId?: number
}

const Files = ({taskId}: FilesProps) => {
    const[fileUpload, setFileUpload] = React.useState<File | null>(null)

    const imageListRef = ref(storage, 'images/')
    const dispatch = useAppDispatch()

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFileUpload(e.target.files[0])
        }
    }

    const uploadFiles = async() => {
        if (fileUpload == null) return
        const fileRef = ref(storage, `images/${fileUpload?.name + v4()}`)

        try {
            await uploadBytes(fileRef, fileUpload)

            const downloadUrl = await getDownloadURL(fileRef)

            dispatch({ type: 'tasks/filesAdded', payload: {
                id: taskId,
                fileUrl: downloadUrl
            }})
            alert('File uploaded!')
        }
        catch(error) {
            console.error('Uploading error: ', error)
        }
    }

    return (
        <div>
            <input type='file' onChange={handleFileChange}/>
            <button onClick={uploadFiles} className='btn-rnd-corner'>Upload file</button>
        </div>
    )
}

export default Files