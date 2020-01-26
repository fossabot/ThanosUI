import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MockRoutingModule } from './mock-routing.module';
import { MockComponent } from './mock.component';
import { MaterialModule } from 'src/app/models/MaterialModule';
import { FormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader';


@NgModule({
  declarations: [MockComponent],
  imports: [
    CommonModule,
    MockRoutingModule,
    MaterialModule,
    FormsModule,
    NgHttpLoaderModule.forRoot(),
  ],
})
export class MockModule { }
