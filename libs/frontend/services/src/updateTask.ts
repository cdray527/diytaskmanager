import { createAxiosClient } from '@diytaskmanager/libs-frontend-utils';

async function updateTask(id: number, body = {}) {
    const axiosClient = createAxiosClient('task');

    try {
        await axiosClient.put(`/task/${id}`, {
            id,
            ...body
        });

        return {
            status: true
        };
    } catch (error) {
        console.log('Failed to update task:', error);
        return {
            status: false
        };
    }
}

export default updateTask;
