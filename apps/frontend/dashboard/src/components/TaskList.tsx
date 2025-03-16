'use client';

import TaskItem from './TaskItem';
import { ITasks } from '@diytaskmanager/libs-frontend-utils';

function TaskList({ tasks = [] }: ITasks) {
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
                    onClickDeleteButton={() => handleOnClickDeleteButton(task.id)}
                />
            ))}
        </div>
    );
}

export default TaskList;
