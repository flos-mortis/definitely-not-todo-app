import React from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
    isShown: boolean;
    children: React.ReactNode;
    onClose: () => void; 
}

const Modal = ({isShown, children, onClose}: ModalProps) => {
    return (
        isShown 
        ? ReactDOM.createPortal(
            <div className='modal-wrap'>
                <div className='modal-content'>
                    {children}
                    <button onClick={onClose}>Close</button>
                </div>
            </div>,
            document.body
        ) : null)
}

export default Modal