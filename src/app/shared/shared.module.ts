import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageComponent } from './components/page/page.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import {AvatarComponent} from './components/avatar/avatar.component';
import {IconMessageComponent} from './components/icon-message/icon-message.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageComponent,
    AvatarComponent,
    IconMessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatBadgeModule,
  ],
  exports: [
    PageComponent,
    AvatarComponent,
    IconMessageComponent
  ]
})
export class SharedModule { }
