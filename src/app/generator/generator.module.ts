import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratorRoutingModule } from './generator-routing.module';
import { GeneratorPageComponent } from './components/generator-page/generator-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ArticlesComponent } from './components/articles/articles.component';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { CoursesComponent } from './components/courses/courses.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { SubmissionsComponent } from './components/submissions/submissions.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [GeneratorPageComponent, ArticlesComponent, CoursesComponent, TasksComponent, SubmissionsComponent],
  imports: [
    CommonModule,
    GeneratorRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatTooltipModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class GeneratorModule { }
