import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    async getTasks(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TaskWhereUniqueInput;
        where?: Prisma.TaskWhereInput;
        orderBy?: Prisma.TaskOrderByWithRelationInput;
    }): Promise<Task[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.task.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        });
    }

    async getTask(id: Prisma.TaskWhereUniqueInput): Promise<Task | null> {
        return this.prisma.task.findUnique({
            where: id
        });
    }

    async createTask(data: Prisma.TaskCreateInput, userId: Prisma.UserCreateInput): Promise<Task> {
        return this.prisma.task.create({
            data: {
                ...data,
                createdBy: {
                    connect: { id: userId.id }
                }
            }
        });
    }

    async updateTask(params: {
        where: Prisma.TaskWhereUniqueInput;
        data: Prisma.TaskUpdateInput;
    }): Promise<Task> {
        const { where, data } = params;
        return this.prisma.task.update({
            data,
            where
        });
    }

    async deleteTask(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
        return this.prisma.task.delete({
            where
        });
    }
}
