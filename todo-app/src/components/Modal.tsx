import React from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
    isShown: boolean;
    children: React.ReactNode;
    onClose: () => void
}

const Modal = ({isShown, children, onClose}: ModalProps) => {
    return (
        isShown 
        ? ReactDOM.createPortal(
            <div className='modal-wrap'>
                <div className='modal-content'>
                    <div className='modal-close'>
                        <button onClick={onClose} className='btn-close btn-round'>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    {children}
                </div>
            </div>,
            document.body
        ) : null)
}

export default Modal