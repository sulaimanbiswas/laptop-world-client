import React from "react";

const ConfirmationModal = ({
  title,
  message,
  modalData,
  closeModal,
  successAction,
  successColor,
}) => {
  return (
    <div>
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          {message && <p className="py-4">{message}</p>}
          <div className="modal-action">
            <label onClick={closeModal} className="btn">
              Cancel
            </label>
            <label
              onClick={() => successAction(modalData)}
              htmlFor="confirmation-modal"
              className={`btn ${successColor}`}
            >
              Delete
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
