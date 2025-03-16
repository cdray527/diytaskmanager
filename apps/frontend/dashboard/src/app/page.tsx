import { fetchTasks } from '@diytaskmanager/libs-frontend-services';

export default async function Dashboard() {
    const tasks = await fetchTasks();

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {tasks.map((task: { id: string; title: string }) => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
}
