import { Injectable } from '@nestjs/common';
import { Task } from '../task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  createTask(title: string, description: string): Task {
    const id = this.tasks.length + 1;
    const task: Task = {
        id,
        title,
        description,
        status: 'OPEN',
    };
    this.tasks.push(task);
  }
}
