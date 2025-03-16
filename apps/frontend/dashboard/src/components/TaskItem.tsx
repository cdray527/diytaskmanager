'use client';

import { useState } from 'react';
import { ITask } from '@diytaskmanager/libs-frontend-utils';
import cn from 'classnames';

interface TaskItemProps extends ITask {
    onClickDeleteButton: () => void;
}

function TaskItem({ title, status, statusId, description, onClickDeleteButton }: TaskItemProps) {
    // const [isExpanded, setIsExpanded] = useState(false);

    const [currentTitle, setCurrentTitle] = useState(title);
    const [currentDescription, setCurrentDescription] = useState(description || '');
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Editing title', e.target.value);
        setCurrentTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log('Editing title', e.target.value);
        setCurrentDescription(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent, editCallBack: (value: boolean) => void) => {
        if (e.key === 'Enter') editCallBack(false);
    };

    return (
        <div
            className="bg-white text-black border border-gray-300 rounded-md p-3 shadow-md"
            // onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="flex justify-between items-center">
                {/* Left side */}
                <div className="flex items-center gap-2">
                    {isEditingTitle ? (
                        <input
                            type="text"
                            value={currentTitle}
                            onChange={handleTitleChange}
                            onKeyDown={(e) => handleKeyDown(e, setIsEditingTitle)}
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
                {/* Right side */}
                <div className="flex items-center gap-2">
                    <span
                        className={cn(
                            'flex items-center h-6 px-4 rounded-xl text-sm font-semibold',
                            {
                                'bg-green-600 text-white': statusId === 2,
                                'bg-yellow-600 text-white': statusId === 1
                            }
                        )}
                    >
                        {status.name}
                    </span>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClickDeleteButton();
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
                        onKeyDown={(e) => handleKeyDown(e, setIsEditingDescription)}
                        autoFocus
                        className="border bg-gray-100 border-gray-400 px-2 py-1 rounded w-full"
                    />
                ) : (
                    <p className="text-gray-700 text-sm">{currentDescription}</p>
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
