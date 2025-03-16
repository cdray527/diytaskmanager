'use client';

import { useRef } from 'react';
import { Modal } from '@diytaskmanager/libs-frontend-ui';

interface NewTaskInterface {
    title: string;
    description?: string;
    statusId: number;
}

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateTask: ({ title, description, statusId }: NewTaskInterface) => void;
}

function AddTaskModal({ isOpen, onClose, onCreateTask }: AddTaskModalProps) {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(formRef.current!);

        onCreateTask({
            title: formData.get('title') as string,
            description: (formData.get('description') as string) || '',
            statusId: Number(formData.get('statusId'))
        });

        onClose();
        formRef.current?.reset();
    };

    return (
        <Modal id="add-task-modal" defaultIsOpen={isOpen}>
            <h3 className="font-bold text-xl">Add New Task</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="py-4">
                <label className="block text-md text-white font-medium text-gray-700">
                    Task Title
                </label>
                <input
                    type="text"
                    name="title"
                    required
                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                    placeholder="Enter task title"
                />

                <label className="block mt-4 text-md text-white font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    name="description"
                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                    placeholder="Enter task description"
                />

                <label className="block mt-4 text-md text-white font-medium text-gray-700">
                    Status
                </label>
                <select name="statusId" className="w-full p-2 mt-1 border border-gray-300 rounded">
                    <option value={1}>To Do</option>
                    <option value={2}>Completed</option>
                </select>

                <div className="flex justify-end gap-2 mt-4">
                    <button type="submit" className="btn btn-primary">
                        Add Task
                    </button>
                    <button type="button" className="btn btn-soft" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default AddTaskModal;
