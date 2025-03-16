import { GetServerSideProps } from 'next';
import { fetchTasks } from '@diytaskmanager/libs-frontend-services';

interface Task {
    id: string;
    title: string;
}

interface TasksProps {
    tasks: Task[];
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const tasks = await fetchTasks();
        return { props: { tasks } };
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        return { props: { tasks: [], error: 'Failed to load tasks' } };
    }
};

export function Index({ tasks }: TasksProps) {
    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Index;
