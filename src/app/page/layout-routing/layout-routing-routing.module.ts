import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { DetailLayoutComponent } from './detail-layout/detail-layout.component';
import { HomeModule } from '../home/home.module';
import { MockModule } from '../mock/mock.module';
import { SchemaModule } from '../schema/schema.module';
import { ContractModule } from '../contract/contract.module';
import { ContractDetailModule } from '../contract-detail/contract-detail.module';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', loadChildren: () => HomeModule },
      { path: 'mock', loadChildren: () => MockModule },
      { path: 'schema', loadChildren: () => SchemaModule},
      { path: 'contract', loadChildren: () => ContractModule },
    ]
  },
  {
    path: 'detail',
    component: DetailLayoutComponent,
    children: [
      { path: 'contract/:schemaId', loadChildren: () => ContractDetailModule },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingRoutingModule { }
