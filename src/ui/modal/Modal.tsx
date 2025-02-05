import React from 'react'

interface ModalProps {
  modalId: string
  modalTitle: string
  setActivePageNo: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
  modalId,
  modalTitle,
  setActivePageNo,
  children,
}) => {
  return (
    <>
      <div
        className="modal fade"
        data-modal="true"
        data-modal-disable-scroll="false"
        id={modalId}
      >
        <div className="modal-content max-w-[600px] top-[10%]">
          <div className="modal-header">
            <h3 className="modal-title">{modalTitle}</h3>
            <button
              className="btn btn-xs btn-icon btn-light"
              data-modal-dismiss="true"
            >
              <i className="ki-outline ki-cross"></i>
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </>
  )
}

export default Modal
