import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { DeletePageComponent } from './components/delete-page/delete-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProfilePageComponent
  },
  {
    path: 'edit',
    component: EditProfileComponent
  },
  {
    path: 'delete',
    component: DeletePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
