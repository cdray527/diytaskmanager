import { createAxiosClient } from '@diytaskmanager/libs-frontend-utils';

async function fetchTasks() {
    const axiosClient = createAxiosClient('task');

    try {
        const response = await axiosClient.get('/task');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        throw error;
    }
}

export default fetchTasks;
