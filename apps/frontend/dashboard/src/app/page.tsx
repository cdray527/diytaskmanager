'use client';

import { useState, useEffect } from 'react';
import { fetchTasks } from '@diytaskmanager/libs-frontend-services';

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const data = await fetchTasks();
                setTasks(data);
            } catch (error) {
                console.log(error);
            }
        };
        loadTasks();
    }, []);

    useEffect(() => {
        console.log('Tasks:', tasks);
    }, [tasks]);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}
