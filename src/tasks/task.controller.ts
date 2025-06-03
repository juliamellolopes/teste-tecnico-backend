import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Tarefas')
@ApiBearerAuth()
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as any;
    return this.taskService.findAllByUser(user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() req: Request, @Body() data: CreateTaskDto) {
    const user = req.user as any;
    return this.taskService.create(data, user.userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Task>,
    @Req() req: Request
  ) {
    const user = req.user as any;
    return this.taskService.update(id, user.id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request
  ) {
    const user = req.user as any;
    await this.taskService.remove(id, user.id);
    return { message: 'Task deletada com sucesso' };
  }
}
