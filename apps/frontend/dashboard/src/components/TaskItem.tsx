'use client';

import { useState, useRef } from 'react';
import { ITask } from '@diytaskmanager/libs-frontend-utils';
import { updateTask } from '@diytaskmanager/libs-frontend-services';
import { useOutsideClick } from '@diytaskmanager/libs-frontend-utils';
import cn from 'classnames';

interface TaskItemProps extends ITask {
    onClickDeleteButton: (id: number) => void;
}

function TaskItem({
    id,
    title,
    status,
    statusId,
    description,
    onClickDeleteButton
}: TaskItemProps) {
    // const [isExpanded, setIsExpanded] = useState(false);

    const [currentTitle, setCurrentTitle] = useState(title);
    const [currentDescription, setCurrentDescription] = useState(description || '');
    const [currentStatus, setCurrentStatus] = useState({ id: statusId, name: status.name });

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    const statusDropdownRef = useRef(null);
    useOutsideClick(statusDropdownRef, () => setShowStatusDropdown(false));

    const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.target.value);
    };

    const handleDescriptionChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentDescription(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent, editCallBack: (value: boolean) => void) => {
        if (e.key === 'Enter') editCallBack(false);
    };

    const handleStatusChange = async (newStatusId: number, newStatusName: string) => {
        const updateTaskRes = await updateTask(id, { statusId: newStatusId });
        if (updateTaskRes) {
            setCurrentStatus({ id: newStatusId, name: newStatusName });
            setShowStatusDropdown(false);
        }
    };

    return (
        <div
            className="bg-white text-black border border-gray-300 rounded-md p-3 shadow-md"
            // onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="flex flex-col flex-wrap sm:flex-row justify-start sm:justify-between items-center">
                {/* Left side */}
                <div className="inline-block sm:flex items-center gap-2 w-full sm:w-auto overflow-hidden text-ellipsis ">
                    {isEditingTitle ? (
                        <input
                            type="text"
                            value={currentTitle}
                            onChange={handleTitleChange}
                            onKeyDown={(e) =>
                                handleKeyDown(e, async () => {
                                    const updateTaskRes = await updateTask(id, {
                                        title: currentTitle
                                    });
                                    if (updateTaskRes) setIsEditingTitle(false);
                                })
                            }
                            onBlur={() => setIsEditingTitle(false)}
                            autoFocus
                            className="border border-gray-400 px-2 py-1 bg-white rounded w-full"
                        />
                    ) : (
                        <span
                            className="font-semibold text-lg cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEditingTitle(true);
                            }}
                        >
                            {currentTitle}
                        </span>
                    )}
                </div>
                {/* Right side - Status & Delete button */}
                <div className="flex items-center gap-2 relative w-full sm:w-auto mt-2 sm:mt-0">
                    {/* Status Dropdown */}
                    <div className="relative">
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowStatusDropdown(!showStatusDropdown);
                            }}
                            className={cn(
                                'flex items-center h-6 px-4 rounded-xl text-sm font-semibold cursor-pointer',
                                {
                                    'bg-green-600 text-white': currentStatus.id === 2,
                                    'bg-yellow-600 text-white': currentStatus.id === 1
                                }
                            )}
                        >
                            {currentStatus.name}
                        </span>

                        {showStatusDropdown && (
                            <div
                                ref={statusDropdownRef}
                                className="absolute right-0 mt-2 w-36 bg-white border-2 border-gray-700 border-line rounded-md shadow-lg z-50 min-w-max"
                                style={{ top: '100%' }}
                                onBlur={() => setShowStatusDropdown(false)}
                            >
                                <button
                                    onClick={() => handleStatusChange(1, 'To Do')}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-gray-800"
                                >
                                    To Do
                                </button>
                                <button
                                    onClick={() => handleStatusChange(2, 'Completed')}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-gray-800"
                                >
                                    Completed
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Delete Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClickDeleteButton(id);
                        }}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Delete Task"
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div>

            {/* {isExpanded && ( */}
            <div className="mt-2 p-2 bg-gray-100 rounded relative">
                {isEditingDescription ? (
                    <textarea
                        value={currentDescription}
                        onChange={handleDescriptionChange}
                        onBlur={() => setIsEditingDescription(false)}
                        onKeyDown={(e) =>
                            handleKeyDown(e, async () => {
                                const updateTaskRes = await updateTask(id, {
                                    description: currentDescription
                                });
                                if (updateTaskRes) setIsEditingDescription(false);
                            })
                        }
                        autoFocus
                        className="border bg-gray-100 border-gray-400 px-2 py-1 rounded w-full"
                    />
                ) : (
                    <p className="text-gray-700 text-sm min-h-4">{currentDescription}</p>
                )}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsEditingDescription(true);
                    }}
                    className={cn('text-gray-500 hover:text-gray-700 absolute bottom-1 right-1', {
                        hidden: isEditingDescription
                    })}
                    aria-label="Edit Description"
                >
                    <i className="fas fa-pencil-alt text-xs"></i>
                </button>
            </div>
            {/* )} */}
        </div>
    );
}

export default TaskItem;
