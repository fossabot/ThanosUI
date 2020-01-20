import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';


@NgModule({
  declarations: [ContractComponent],
  imports: [
    CommonModule,
    ContractRoutingModule
  ]
})
export class ContractModule { }
