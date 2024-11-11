import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTasksService = {
    createTask: jest.fn((title, description) => ({
      id: 1,
      title,
      description,
      status: 'OPEN',
    })),
    getAllTasks: jest.fn(() => [
      {
        id: 1,
        title: 'Test title',
        description: 'Test description',
        status: 'OPEN',
      },
    ]),
    getTaskById: jest.fn((id) => ({
      id,
      title: 'Test title',
      description: 'Test description',
      status: 'OPEN',
    })),
    updateTaskStatus: jest.fn((id, status) => ({
      id,
      title: 'Test title',
      description: 'Test description',
      status,
    })),
    deleteTask: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', () => {
    const result = controller.createTask({
      title: 'Test title',
      description: 'Test description',
    });
    expect(result).toEqual({
      id: 1,
      title: 'Test title',
      description: 'Test description',
      status: 'OPEN',
    });
    expect(service.createTask).toHaveBeenCalledWith(
      'Test title',
      'Test description',
    );
  });
});
