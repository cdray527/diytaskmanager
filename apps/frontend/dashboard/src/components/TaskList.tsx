'use client';

import TaskItem from './TaskItem';
import { ITasks } from '@diytaskmanager/libs-frontend-utils';

function TaskList({ tasks = [] }: ITasks) {
    const handleOnClickEditButton = (taskId: number) => {
        console.log('edit');
    };

    const handleOnClickDeleteButton = (taskId: number) => {
        console.log('delete');
    };

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    statusId={task.statusId}
                    status={task.status}
                    description={task.description}
                    onClickEditButton={() => handleOnClickEditButton(task.id)}
                    onClickDeleteButton={() => handleOnClickDeleteButton(task.id)}
                />
            ))}
        </div>
    );
}

export default TaskList;
