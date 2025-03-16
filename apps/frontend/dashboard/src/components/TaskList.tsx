'use client';

import { useState } from 'react';
import TaskItem from './TaskItem';
import { ITasks } from '@diytaskmanager/libs-frontend-utils';
import { Modal } from '@diytaskmanager/libs-frontend-ui';
import { deleteTask } from '@diytaskmanager/libs-frontend-services';

function TaskList({ tasks = [] }: ITasks) {
    const [currentTasks, setCurrentTasks] = useState(tasks);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

    const handleOnClickDeleteButton = (taskId: number) => {
        console.log('deleting', taskId);
        setIsDeleteModalOpen(true);
        setSelectedTaskId(taskId);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedTaskId(null);
    };

    const handleConfirmDelete = async () => {
        if (selectedTaskId) {
            const deleteTaskRes = await deleteTask(selectedTaskId);
            if (deleteTaskRes.status) {
                console.log('deleted task', selectedTaskId);
                setCurrentTasks(currentTasks.filter((task) => task.id !== selectedTaskId));
                closeDeleteModal();
            }
        }
    };

    return (
        <>
            <div className="space-y-4">
                {currentTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        statusId={task.statusId}
                        status={task.status}
                        description={task.description}
                        onClickDeleteButton={(id) => handleOnClickDeleteButton(id)}
                    />
                ))}
            </div>

            {isDeleteModalOpen && (
                <Modal
                    id="delete-modal"
                    defaultIsOpen={isDeleteModalOpen}
                    showCloseButton
                    onClickCloseButton={closeDeleteModal}
                >
                    <h3 className="font-bold text-lg">Delete Task</h3>
                    <p className="py-4">Are you sure you want to delete this task?</p>
                    <div className="flex gap-4">
                        <button className="btn btn-error" onClick={handleConfirmDelete}>
                            Confirm Delete
                        </button>
                        <button className="btn" onClick={closeDeleteModal}>
                            Cancel
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default TaskList;
