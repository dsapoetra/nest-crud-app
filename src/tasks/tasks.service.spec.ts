import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', () => {
    const task = service.createTask('Test title', 'Test description');
    expect(task).toEqual({
      id: 1,
      title: 'Test title',
      description: 'Test description',
      status: 'OPEN',
    });
  });

  it('should retrieve all task', () => {
    service.createTask('Test title', 'Test description');
    const tasks = service.getAllTasks();
    expect(tasks.length).toEqual(1);
    expect(tasks[0].id).toEqual(1);
  });

  it('should retrieve task by id', () => {
    service.createTask('Test title', 'Test description');
    const task = service.getTaskById(1);
    expect(task).toEqual({
      id: 1,
      title: 'Test title',
      description: 'Test description',
      status: 'OPEN',
    });
  });

  it('should return undefined if retrieve task by not exists id', () => {
    service.createTask('Test title', 'Test description');
    const task = service.getTaskById(2);
    expect(task).toBeUndefined();
  });

  it('should update task status', () => {
    service.createTask('Test title', 'Test description');
    const task = service.updateTaskStatus(1, 'DONE');
    expect(task).toEqual({
      id: 1,
      title: 'Test title',
      description: 'Test description',
      status: 'DONE',
    });
  });

  it('deleting a task', () => {
    service.createTask('Test title', 'Test description');
    service.deleteTask(1);
    const tasks = service.getAllTasks();
    expect(tasks.length).toEqual(0);
  });

  it('deleting an undefined task', () => {
    service.createTask('Test title', 'Test description');
    service.deleteTask(3);
    const tasks = service.getAllTasks();
    expect(tasks.length).toEqual(1);
  });
});
