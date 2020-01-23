import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MockComponent } from './mock.component';


const routes: Routes = [
  {
    path: '',
    component: MockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MockRoutingModule { }
