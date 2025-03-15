import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    async getTasks(): Promise<Task[]> {
        return this.taskService.getTasks({});
    }

    @Get(':id')
    async getTask(@Param('id') id: number): Promise<Task | null> {
        return this.taskService.getTask({ id: Number(id) });
    }

    @Post()
    async createTask(
        @Body()
        postData: {
            title: string;
            description?: string | null;
        },
        userId: string
    ): Promise<Task> {
        const { title, description } = postData;
        return this.taskService.createTask(
            {
                title,
                description,
                createdBy: {
                    create: undefined,
                    connectOrCreate: undefined,
                    connect: undefined
                }
            },
            {
                id: userId,
                email: '',
                password: ''
            }
        );
    }
}
