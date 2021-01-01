import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoursesService } from '../../../root/services/courses.service';
import { ICourse } from '../../../root/interfaces/course.interface';
import { combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { GeneratorService } from '../../../root/services/generator.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: ICourse[];

  displayedColumns: string[] = ['id', 'title', 'description', 'start'];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private coursesService: CoursesService,
    private generatorService: GeneratorService
  ) { }

  ngOnInit(): void {
    this.updateCourses();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  generateCourse(): void {
    this.generatorService.generateCourse()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.updateCourses();
      });
  }

  startCourse(id: number): void {
    this.coursesService.startCourse(id)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.updateCourses();
      });
  }

  private updateCourses(): void {
    combineLatest([
      this.coursesService.getAllCourses(),
      this.coursesService.getStartedCourses(),
    ])
      .pipe(
        map((value: [ICourse[], ICourse[]]) => {
          const allCourses = value[0];
          const startedCourses = value[1];

          return allCourses.map(course => {
            return {
              ...course,
              isStarted: startedCourses
                .filter(startedCourse => startedCourse.id === course.id)
                .length > 0
            };
          });
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((courses) => {
        this.courses = courses;
      });
  }
}
