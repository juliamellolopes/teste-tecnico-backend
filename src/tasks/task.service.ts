import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) { }

  findAll() {
    return this.taskRepository.find();
  }

  create(data: CreateTaskDto, userId: number) {
    const task = this.taskRepository.create({ ...data, user: { id: userId } });
    return this.taskRepository.save(task);
  }

  async findAllByUser(userId: number) {
    return this.taskRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }

  async update(id: number, userId: number, data: Partial<Task>): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, user: { id: userId } } });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    Object.assign(task, data);
    return this.taskRepository.save(task);
  }

  async remove(id: number, userId: number): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id, user: { id: userId } } });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    await this.taskRepository.remove(task);
  }
}
