import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICourse} from '../../../root/interfaces/course.interface';
import {combineLatest, Subject} from 'rxjs';
import {CoursesService} from '../../../root/services/courses.service';
import {GeneratorService} from '../../../root/services/generator.service';
import {map, takeUntil} from 'rxjs/operators';
import {ITask} from '../../../root/interfaces/task.interface';
import {TasksService} from '../../../root/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  tasks: ITask[];

  displayedColumns: string[] = ['id', 'course', 'title', 'description', 'start'];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private tasksService: TasksService,
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
    this.tasksService.startTask(id)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.updateCourses();
      });
  }

  private updateCourses(): void {
    combineLatest([
      this.tasksService.getAvailableTasks(),
      this.tasksService.getStartedTasks(),
    ])
      .pipe(
        map((value: [ITask[], ITask[]]) => {
          const allTasks = value[0];
          const startedTasks = value[1];

          return allTasks.map(task => {
            return {
              ...task,
              isStarted: startedTasks
                .filter(startedTask => startedTask.id === task.id)
                .length > 0
            };
          });
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
  }
}
