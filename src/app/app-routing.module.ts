import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './module/home/home.component';
import { SchemaComponent } from './module/schema/schema.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'schema',
    component: SchemaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
