import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '../task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(@Body() body: { title: string; description: string }): Task {
    return this.tasksService.createTask(body.title, body.description);
  }

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(Number(id));
  }

  @Put(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: 'OPEN' | 'DONE',
  ): Task {
    return this.tasksService.updateTaskStatus(Number(id), status);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number): void {
    this.tasksService.deleteTask(id);
  }
}
