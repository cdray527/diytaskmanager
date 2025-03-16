export interface ITask {
    id: number;
    title: string;
    description?: string;
    statusId: number;
    status: {
        name: string;
    };
}

export interface ITasks {
    tasks?: ITask[];
}
