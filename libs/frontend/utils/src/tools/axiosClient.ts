import axios from 'axios';

// Define the allowed services
type ApiServiceName = 'task';

const apiServiceUrlMapper: Record<ApiServiceName, { SSR: string; CSR: string }> = {
    task: {
        SSR: `${process.env.NEXT_PRIVATE_TASK_API_URL}`,
        CSR: `${process.env.NEXT_PUBLIC_TASK_API_URL}`
    }
};

const createAxiosClient = (serviceName: ApiServiceName) => {
    const isSSR = typeof window === 'undefined';

    const baseURL = isSSR
        ? apiServiceUrlMapper[serviceName].SSR
        : apiServiceUrlMapper[serviceName].CSR;

    return axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export default createAxiosClient;
