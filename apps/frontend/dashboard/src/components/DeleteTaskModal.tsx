import React from 'react';
import { Modal } from '@diytaskmanager/libs-frontend-ui';

interface DeleteTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmDelete: () => void;
}

function DeleteTaskModal({ isOpen, onClose, onConfirmDelete }: DeleteTaskModalProps) {
    return (
        <Modal
            id="delete-modal"
            defaultIsOpen={isOpen}
            showCloseButton
            onClickCloseButton={onClose}
        >
            <h3 className="font-bold text-xl">Delete Task</h3>
            <p className="py-4">Are you sure you want to delete this task?</p>
            <div className="flex justify-end gap-4">
                <button className="btn btn-error" onClick={onConfirmDelete}>
                    Confirm Delete
                </button>
                <button className="btn btn-soft" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </Modal>
    );
}

export default DeleteTaskModal;
