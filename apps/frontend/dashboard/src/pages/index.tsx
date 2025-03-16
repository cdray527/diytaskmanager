import { GetServerSideProps } from 'next';
import { fetchTasks } from '@diytaskmanager/libs-frontend-services';
import TaskList from '../components/TaskList';
import { ITasks } from '@diytaskmanager/libs-frontend-utils';

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const tasks = await fetchTasks();
        return { props: { tasks } };
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        return { props: { tasks: [], error: 'Failed to load tasks' } };
    }
};

export function Index({ tasks = [] }: ITasks) {
    return (
        <div>
            <TaskList tasks={tasks} />
        </div>
    );
}

export default Index;
