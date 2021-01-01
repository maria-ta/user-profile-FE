import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ICourse } from '../interfaces/course.interface';
import { HttpClient } from '@angular/common/http';
import { ISubmission } from '../interfaces/submission.interface';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly coursesApiUrl = `${environment.server}api/courses`;

  constructor(
    private http: HttpClient
  ) { }

  getAllCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`${this.coursesApiUrl}/all`);
  }

  getStartedCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`${this.coursesApiUrl}/started`);
  }

  startCourse(id: number): Observable<ISubmission> {
    return this.http.post<ISubmission>(
      `${this.coursesApiUrl}/start`,
      { id: `${id}` }
    );
  }
}
