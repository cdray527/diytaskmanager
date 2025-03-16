'use client';

import { useState } from 'react';
import TaskItem from './TaskItem';
import AddTaskModal from './AddTaskModal';
import { ITasks } from '@diytaskmanager/libs-frontend-utils';
import { Modal } from '@diytaskmanager/libs-frontend-ui';
import { createTask, deleteTask } from '@diytaskmanager/libs-frontend-services';

function TaskList({ tasks = [] }: ITasks) {
    const [currentTasks, setCurrentTasks] = useState(tasks);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

    // Add Task Modal Related
    const openAddTaskModal = () => {
        setIsAddTaskModalOpen(true);
    };
    const closeAddTaskModal = () => {
        setIsAddTaskModalOpen(false);
    };
    const handleAddTask = async (newTaskData: any) => {
        const createTaskRes = await createTask(newTaskData);
        if (createTaskRes) {
            console.log('created task', createTaskRes);
            setCurrentTasks((prevTasks) => [...prevTasks, createTaskRes]);
        }
    };

    // Delete Task Modal Related
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
                setCurrentTasks((prevTasks) =>
                    prevTasks.filter((task) => task.id !== selectedTaskId)
                );
                closeDeleteModal();
            }
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-semibold text-2xl">Task Dashboard</h1>
                <button className="btn btn-primary" onClick={openAddTaskModal}>
                    + Add Task
                </button>
            </div>

            <div className="space-y-4">
                {currentTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        statusId={task.statusId}
                        status={task.status}
                        description={task.description}
                        onClickDeleteButton={() => handleOnClickDeleteButton(task.id)}
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

            {isAddTaskModalOpen && (
                <AddTaskModal
                    isOpen={isAddTaskModalOpen}
                    onClose={closeAddTaskModal}
                    onCreateTask={handleAddTask}
                />
            )}
        </>
    );
}

export default TaskList;
