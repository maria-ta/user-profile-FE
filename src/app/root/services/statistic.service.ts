import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IDiagramDatum } from '../interfaces/diagram-data.interface';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { map, mergeMap } from 'rxjs/operators';
import * as moment from 'moment';
import { ITag } from '../interfaces/tag.interface';
import { ICourse } from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  private readonly statisticUrl = `${environment.server}api/statistics`;
  private readonly coursesUrl = `${environment.server}api/courses`;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) { }

  getActivity(): Observable<IDiagramDatum[]> {
    return this.userService.getCurrentUser()
      .pipe(
        mergeMap((user) => {
          return this.httpClient.get<object>(`${this.statisticUrl}/activity`, {
            params: {
              user: user.id,
              days: '60'
            }
          });
        }),
        map(
          (obj: object) => {
            return Object.entries(obj)
              .sort((a, b) => {
                if (a[0] > b[0]) { return 1; }
                if (a[0] < b[0]) { return -1; }
                return 0;
              })
              .map(([key, value]) => {
                return {
                  name: moment(key).format('D MMM, YYYY'),
                  value: parseFloat('' + value)
                };
            });
          }
        )
      );
  }

  getAverageRateTiming(): Observable<IDiagramDatum[]> {
    return this.userService.getCurrentUser()
      .pipe(
        mergeMap((user) => {
          return this.httpClient.get<object>(`${this.statisticUrl}/rates-timing`, {
            params: {
              user: user.id,
              days: '14'
            }
          });
        }),
        map(
          (obj: object) => {
            return Object.entries(obj)
              .sort((a, b) => {
                if (a[0] > b[0]) { return 1; }
                if (a[0] < b[0]) { return -1; }
                return 0;
              })
              .map(([key, value]) => {
                return {
                  name: moment(key).format('D MMM, YYYY'),
                  value: parseFloat('' + value)
                };
            });
          }
        )
      );
  }

  getAverageRate(): Observable<number> {
    return this.userService.getCurrentUser()
      .pipe(
        mergeMap((user) => {
          return this.httpClient.get<number>(`${this.statisticUrl}/average-rate`, {
            params: {
              user: user.id
            }
          });
        })
      );
  }

  getFavouriteTopics(): Observable<ITag[]> {
    return this.userService.getCurrentUser()
      .pipe(
        mergeMap((user) => {
          return this.httpClient.get<ITag[]>(`${this.statisticUrl}/favourite-topics`, {
            params: {
              user: user.id
            }
          });
        })
      );
  }

  getStartedCourses(): Observable<ICourse[]> {
    return this.userService.getCurrentUser()
      .pipe(
        mergeMap((user) => {
          return this.httpClient.get<ICourse[]>(`${this.coursesUrl}/started/statistic`, {
            params: {
              user: user.id
            }
          });
        }),
        map(courses => courses.map(course => {
          return {
            ...course,
            finished: parseInt((course.finished || 0) + '', 10),
            planned: parseInt((course.planned || 0) + '', 10)
          };
        }))
      );
  }
}
