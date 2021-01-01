import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../../../root/services/user.service';
import { IUser } from '../../../root/interfaces/user.interface';
import { map, takeUntil } from 'rxjs/operators';
import { StatisticService } from '../../../root/services/statistic.service';
import { IDiagramDatum, IDiagramDatumSeries } from '../../../root/interfaces/diagram-data.interface';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  user: IUser;

  favoriteTopics: IDiagramDatum[];
  activitiesTiming: IDiagramDatum[];
  marksTiming: IDiagramDatumSeries[];
  averageRate: number;
  startedCourses: IDiagramDatum[];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private userService: UserService,
    private statisticService: StatisticService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAverageRate();
    this.getActivity();
    this.getAverageRatesTiming();
    this.getFavouriteTopics();
    this.getStartedCourses();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getCurrentUser(): void {
    this.userService.getCurrentUser()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(user => {
        this.user = user;
      });
  }

  private getAverageRate(): void {
    this.statisticService.getAverageRate()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(mark => {
        this.averageRate = mark;
      });
  }

  private getActivity(): void {
    this.statisticService.getActivity()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(activity => {
        this.activitiesTiming = activity;
      });
  }

  private getAverageRatesTiming(): void {
    this.statisticService.getAverageRateTiming()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(marks => {
        this.marksTiming = [{
          name: 'Average mark',
          series: marks
        }];
      });
  }

  private getFavouriteTopics(): void {
    this.statisticService.getFavouriteTopics()
      .pipe(
        takeUntil(this.unsubscribe$),
        map(tags => {
          return tags.map(tag => {
            return {
              name: tag.label,
              value: tag.count
            };
          });
        })
      )
      .subscribe(topics => {
        this.favoriteTopics = topics;
      });
  }

  private getStartedCourses(): void {
    this.statisticService.getStartedCourses()
      .pipe(
        takeUntil(this.unsubscribe$),
        map(courses => {
          return courses.map(course => {
            return {
              name: course.title,
              value: course.finished / course.planned
            };
          });
        })
      )
      .subscribe(courses => {
        this.startedCourses = courses;
      });
  }
}
