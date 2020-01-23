import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MockRoutingModule } from './mock-routing.module';
import { MockComponent } from './mock.component';
import { MaterialModule } from 'src/app/models/MaterialModule';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [MockComponent],
  imports: [
    CommonModule,
    MockRoutingModule,
    MaterialModule,
    FormsModule
  ],
})
export class MockModule { }
