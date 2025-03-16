import { Controller, Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Task, Prisma } from '@prisma/client';

@ApiTags('Task')
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    @ApiOperation({ summary: 'Get all tasks' })
    @ApiResponse({ status: 200, description: 'Return all tasks' })
    async getTasks(@Query('orderBy') orderBy?: string): Promise<Task[]> {
        const order = { [orderBy || 'id']: 'asc' };
        return this.taskService.getTasks({ orderBy: order });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get task by id' })
    @ApiResponse({ status: 200, description: 'Return the task with the specified ID' })
    async getTask(@Param('id') id: number): Promise<Task | null> {
        return this.taskService.getTask({ id: Number(id) });
    }

    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 201, description: 'The task has been successfully created' })
    @ApiBody({
        description: 'Payload to create a new task',
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', example: 'New Task' },
                description: { type: 'string', example: 'This is a new task' }
            },
            required: ['title']
        }
    })
    async createTask(@Body() postData: { title: string; description?: string }): Promise<Task> {
        return this.taskService.createTask(postData.title, postData.description ?? '');
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a task' })
    @ApiResponse({ status: 200, description: 'The task has been successfully updated' })
    @ApiBody({
        description: 'Payload to update a task',
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', example: 'Update Title' },
                description: { type: 'string', example: 'Update Description' },
                statusId: { type: 'number', example: 2 }
            },
            required: ['title']
        }
    })
    async updateTask(
        @Param('id') id: number,
        @Body() postData: Prisma.TaskUpdateInput
    ): Promise<Task> {
        return this.taskService.updateTask({
            where: { id: Number(id) },
            data: postData
        });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a task' })
    @ApiResponse({ status: 200, description: 'The task has been successfully deleted' })
    async deleteTask(@Param('id') id: number): Promise<Task> {
        return this.taskService.deleteTask({ id: Number(id) });
    }
}
