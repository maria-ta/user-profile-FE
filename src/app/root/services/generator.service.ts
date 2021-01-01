import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IArticle } from '../interfaces/article.interface';
import { ICourse } from '../interfaces/course.interface';
import { ITask } from '../interfaces/task.interface';

interface ICourseResponse {
  course: ICourse;
  tasks: ITask;
}

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  private readonly generatorApiUrl = `${environment.server}api/generator`;

  constructor(
    private http: HttpClient
  ) { }

  generateArticle(): Observable<IArticle> {
    return this.http.get<IArticle>(`${this.generatorApiUrl}/article`);
  }

  generateCourse(): Observable<ICourseResponse> {
    return this.http.get<ICourseResponse>(`${this.generatorApiUrl}/course-with-duration`);
  }
}
