import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubmission } from '../interfaces/submission.interface';
import { ITask } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly tasksApiUrl = `${environment.server}api/tasks`;

  constructor(
    private http: HttpClient
  ) { }

  getAvailableTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.tasksApiUrl}/available`);
  }

  getStartedTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.tasksApiUrl}/started`);
  }

  startTask(id: number): Observable<ISubmission> {
    return this.http.post<ISubmission>(
      `${this.tasksApiUrl}/start`,
      { id: `${id}` }
    );
  }

  finishTask(taskId: number, comment: string): Observable<ISubmission> {
    return this.http.put<ISubmission>(`${this.tasksApiUrl}/finish`, {
      id: `${taskId}`,
      comment
    });
  }

  markTask(taskId: number, mark: number): Observable<ISubmission> {
    return this.http.put<ISubmission>(`${this.tasksApiUrl}/mark`, {
      id: `${taskId}`,
      mark: `${mark}`
    });
  }

  getSubmissions(): Observable<ISubmission[]> {
    return this.http.get<ISubmission[]>(`${this.tasksApiUrl}/submissions`);
  }
}
