'use client';

import { useState } from 'react';
import { ITask } from '@diytaskmanager/libs-frontend-utils';
import cn from 'classnames';

interface TaskItemProps extends ITask {
    onClickEditButton: () => void;
    onClickDeleteButton: () => void;
}

function TaskItem({
    title,
    status,
    statusId,
    description,
    onClickEditButton,
    onClickDeleteButton
}: TaskItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className="bg-white text-black border border-gray-300 rounded-md p-3 shadow-md cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">{title}</span>

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
                            onClickEditButton();
                        }}
                        className="text-blue-500 hover:text-blue-700"
                        aria-label="Edit Task"
                    >
                        <i className="fas fa-edit"></i>
                    </button>
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
            {isExpanded && (
                <div className="mt-2 p-2 bg-gray-100 rounded">
                    <p className="text-gray-700 text-sm">{description}</p>
                </div>
            )}
        </div>
    );
}

export default TaskItem;
