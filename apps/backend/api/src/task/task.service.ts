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
            orderBy,
            include: {
                status: {
                    select: { name: true }
                }
            }
        });
    }

    async getTask(id: Prisma.TaskWhereUniqueInput): Promise<Task | null> {
        return this.prisma.task.findUnique({
            where: id
        });
    }

    async createTask(title: string, description: string, statusId: number): Promise<Task> {
        const hardcodedUser = await this.prisma.user.findUnique({
            where: { email: 'cdray085@hotmail.com' },
            select: { id: true }
        });

        if (!hardcodedUser) {
            throw new Error('Hardcoded user not found');
        }

        return this.prisma.task.create({
            data: {
                title,
                description,
                status: { connect: { id: statusId } },
                createdBy: {
                    connect: { id: hardcodedUser.id }
                }
            },
            include: {
                status: { select: { name: true } }
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
