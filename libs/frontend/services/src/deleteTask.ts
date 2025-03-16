import { createAxiosClient } from '@diytaskmanager/libs-frontend-utils';

async function deleteTask(id: number) {
    const axiosClient = createAxiosClient('task');

    try {
        await axiosClient.delete(`/task/${id}`);
        return {
            status: true
        };
    } catch (error) {
        console.log('Failed to delete task:', error);
        return {
            status: false
        };
    }
}

export default deleteTask;
