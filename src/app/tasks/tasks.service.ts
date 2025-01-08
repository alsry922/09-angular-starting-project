import {Injectable, signal} from '@angular/core';
import {Task, TaskStatus} from "./task.model";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string, description: string; }) {
    const newTask: Task = {
      id: Math.random().toString(),
      title: taskData.title,
      description: taskData.description,
      status: 'OPEN',
    }
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  updateTaskStatus(id: string, newStatus: TaskStatus) {
    this.tasks.update(oldTasks => oldTasks.map(task => task.id === id ? {...task, status: newStatus} : task));
  }
}
