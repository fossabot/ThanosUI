import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';
import { MockServerService } from '../service/mockserver.service';
import { HttpClientModule } from '@angular/common/http';
import { ContractService } from '../service/contract.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    MockServerService,
    ContractService
  ],
  declarations: []
})

export class CoreModule { }
