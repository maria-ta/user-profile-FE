import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ProfileSideBoardComponent } from './components/profile-side-board/profile-side-board.component';
import { ProfileMainPartComponent } from './components/profile-main-part/profile-main-part.component';
import {BarChartModule, LineChartModule, PieChartModule} from '@swimlane/ngx-charts';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DeletePageComponent } from './components/delete-page/delete-page.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [EditProfileComponent, ProfilePageComponent, ProfileSideBoardComponent, ProfileMainPartComponent, DeletePageComponent],
    imports: [
        ProfileRoutingModule,
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatSelectModule,
        PieChartModule,
        BarChartModule,
        LineChartModule,
        MatExpansionModule,
        MatTooltipModule,
        MatTabsModule,
    ],
  providers: [
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ]
})
export class ProfileModule { }
