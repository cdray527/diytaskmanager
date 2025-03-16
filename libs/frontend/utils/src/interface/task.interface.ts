export interface ITask {
    id: number;
    title: string;
    description?: number;
    statusId: number;
    status: {
        name: string;
    };
}

export interface ITasks {
    tasks?: ITask[];
}
