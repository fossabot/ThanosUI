import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractDetailRoutingModule } from './contract-detail-routing.module';
import { ContractDetailComponent } from './contract-detail.component';
import { MaterialModule } from 'src/app/models/MaterialModule';
import { FormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader';


@NgModule({
  declarations: [ContractDetailComponent],
  imports: [
    CommonModule,
    ContractDetailRoutingModule,
    MaterialModule,
    FormsModule,
    NgHttpLoaderModule.forRoot(),
  ]
})
export class ContractDetailModule { }
