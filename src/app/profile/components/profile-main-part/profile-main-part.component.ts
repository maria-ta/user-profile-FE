import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { IDiagramDatum, IDiagramDatumSeries } from '../../../root/interfaces/diagram-data.interface';


const COLOR_SCHEME_SINGLE_COLOR = {
  domain: ['#5AA454']
};

@Component({
  selector: 'app-profile-main-part',
  templateUrl: './profile-main-part.component.html',
  styleUrls: ['./profile-main-part.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileMainPartComponent implements OnInit {

  @Input() favouriteTopics: IDiagramDatum[];
  @Input() activitiesTiming: IDiagramDatum[];
  @Input() marksTiming: IDiagramDatumSeries[];
  @Input() startedCourses: IDiagramDatum[];

  @Input()
  set averageRate(rate: number) {
    this._averageRate = Math.round(rate * 100) / 100;
  }
  get averageRate(): number {
    return this._averageRate;
  }
  // tslint:disable-next-line:variable-name
  private _averageRate = 4.12;

  colors = {
    singleColor: COLOR_SCHEME_SINGLE_COLOR
  };

  sizes = {
    marksTimingGraphSection: {
      width: 0,
      height: 0
    },
    activityTimingGraphSection: {
      width: 0,
      height: 0
    },
    favoriteTopicsGraphSection: {
      width: 0,
      height: 0
    },
    startedCoursesGraphSection: {
      width: 0,
      height: 0
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.setGraphSize();
  }

  @HostListener('window:resize')
  setGraphSize(): void {
    Object.entries(this.sizes).forEach(([key, value]) => {
      const element = document.getElementById(key);
      this.sizes[key] = {
        width: element.clientWidth,
        height: element.clientHeight
      };
    });
  }

  get message(): string {
    if (this.averageRate === 5) {
      return 'Excellent!';
    }

    if (this.averageRate >= 4.5) {
      return 'Great!';
    }

    if (this.averageRate >= 4) {
      return 'Good!';
    }

    if (this.averageRate >= 3) {
      return 'Don\'t give up!';
    }

    return 'Try again!';
  }

  get colorClass(): string {
    if (this.averageRate === 5) {
      return 'excellent';
    }

    if (this.averageRate >= 4.5) {
      return 'great';
    }

    if (this.averageRate >= 4) {
      return 'good';
    }

    if (this.averageRate >= 3) {
      return 'ok';
    }

    return 'not-ok';
  }
}
