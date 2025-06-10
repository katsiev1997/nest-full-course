import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  tasks = [
    {
      id: 1,
      title: 'Task 1',
      description: 'This is a task description',
      completed: false,
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'This is another task description',
      completed: true,
    },
  ];

  findAll() {
    return this.tasks;
  }

  findById(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  create(dto: CreateTaskDto) {
    const { title, description, priority, tags } = dto;
    const newTask = {
      id: this.tasks[this.tasks.length - 1].id + 1,
      title,
      description,
      priority,
      tags,
      completed: false,
    };
    this.tasks.push(newTask);

    return this.tasks;
  }

  update(id: number, dto: UpdateTaskDto) {
    const task = this.findById(id);

    task.title = dto.title;
    task.completed = dto.completed;

    return this.tasks;
  }

  patchTask(id: number, dto: Partial<UpdateTaskDto>) {
    const task = this.findById(id);

    Object.assign(task, dto);

    return task;
  }

  delete(id: number) {
    const task = this.findById(id);

    this.tasks = this.tasks.filter((task) => task.id !== task.id);

    return task;
  }
}
