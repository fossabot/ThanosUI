import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchemaDetailComponent } from './schema-detail.component';


const routes: Routes = [
  {
    path: '',
    component: SchemaDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchemaDetailRoutingModule { }
