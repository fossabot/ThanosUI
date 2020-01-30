import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractDetailRoutingModule } from './contract-detail-routing.module';
import { ContractDetailComponent } from './contract-detail.component';
import { MaterialModule } from 'src/app/common/MaterialModule';
import { FormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ShareModuleModule } from 'src/app/common/share-module/share-module.module';


@NgModule({
  declarations: [
    ContractDetailComponent
  ],
  imports: [
    CommonModule,
    ContractDetailRoutingModule,
    MaterialModule,
    FormsModule,
    ShareModuleModule,
    NgHttpLoaderModule.forRoot(),
  ]
})
export class ContractDetailModule { }
