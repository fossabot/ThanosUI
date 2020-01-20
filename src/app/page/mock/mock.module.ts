import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MockRoutingModule } from './mock-routing.module';
import { MockComponent } from './mock.component';


@NgModule({
  declarations: [MockComponent],
  imports: [
    CommonModule,
    MockRoutingModule
  ]
})
export class MockModule { }
