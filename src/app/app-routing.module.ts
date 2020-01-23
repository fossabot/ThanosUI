import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'schema',
    loadChildren: () => import('./page/schema/schema.module').then(m => m.SchemaModule)
  },
  {
    path: 'contract',
    loadChildren: () => import('./page/contract/contract.module').then(m => m.ContractModule)
  },
  {
    path: 'mock',
    loadChildren: () => import('./page/mock/mock.module').then(m => m.MockModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
