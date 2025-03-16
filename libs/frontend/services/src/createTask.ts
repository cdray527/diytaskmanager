import { createAxiosClient } from '@diytaskmanager/libs-frontend-utils';

async function createTask(body = {}) {
    const axiosClient = createAxiosClient('task');

    try {
        const response = await axiosClient.post(`/task`, body);
        return response.data;
    } catch (error) {
        console.log('Failed to create task:', error);
    }
}

export default createTask;
