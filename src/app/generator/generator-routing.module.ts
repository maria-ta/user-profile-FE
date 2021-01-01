import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratorPageComponent } from './components/generator-page/generator-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GeneratorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneratorRoutingModule { }
