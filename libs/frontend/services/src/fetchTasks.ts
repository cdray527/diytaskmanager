import axios from 'axios';

async function fetchTasks() {
    try {
        const response = await axios.get(`${process.env.API_URL}/task`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        throw error;
    }
}

export default fetchTasks;
