import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { SchemaComponent } from './page/schema/schema.component';
import { MockComponent } from './page/mock/mock.component';
import { ContractComponent } from './page/contract/contract.component';
import { AboutComponent } from './page/about/about.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'schema',
    component: SchemaComponent
  },
  {
    path: 'contract',
    component: ContractComponent
  },
  {
    path: 'mock',
    loadChildren: () => import('./page/mock/mock.module').then(m => m.MockModule)
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
