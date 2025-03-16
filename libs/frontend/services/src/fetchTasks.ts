import axios from 'axios';

async function fetchTasks() {
    const apiBaseUrl = process.env.NEXT_PRIVATE_API_URL || process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await axios.get(`${apiBaseUrl}/task`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        throw error;
    }
}

export default fetchTasks;
