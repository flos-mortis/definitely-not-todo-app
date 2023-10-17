import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import React, { ChangeEvent } from 'react'
import { v4 } from 'uuid'
import storage from '../firebase'

const Files = () => {
    const[fileUpload, setFileUpload] = React.useState<File | null>(null)
    const[fileList, setFileList] = React.useState<string[]>([])

    const imageListRef = ref(storage, 'images/')

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const uploadedFiles = e.target.files[0]
            setFileUpload(uploadedFiles)
        }
    }
    const uploadFiles = () => {
        if (fileUpload == null) return
        const fileRef = ref(storage, `images/${fileUpload?.name + v4()}`)
        uploadBytes(fileRef, fileUpload).then(() => {
            alert('file uploaded')
        })
    }

    React.useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setFileList([...fileList, url])
                })
            })
        })
    }, [])
    return (
        <div>
            <input type='file' onChange={handleFileChange}/>
            <button onClick={uploadFiles}>upload file</button>
        </div>
    )
}

export default Files