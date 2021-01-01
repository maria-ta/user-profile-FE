import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISubmission } from '../../../root/interfaces/submission.interface';
import { Subject } from 'rxjs';
import { TasksService } from '../../../root/services/tasks.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit, OnDestroy {
  submissions: ISubmission[];

  displayedColumns: string[] = ['id', 'task', 'started', 'finished', 'comment', 'mark', 'set-mark', 'finish'];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.updateSubmissions();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setMark(id: number, mark: number): void {
    this.tasksService.markTask(id, mark)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.updateSubmissions();
      });
  }

  finishSubmission(id: number, comment: string): void {
    this.tasksService.finishTask(id, comment)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.updateSubmissions();
      });
  }

  private updateSubmissions(): void {
    this.tasksService.getSubmissions()
      .subscribe((submissions) => {
        this.submissions = submissions;
      });
  }
}
