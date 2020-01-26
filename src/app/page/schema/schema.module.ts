import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemaRoutingModule } from './schema-routing.module';
import { SchemaComponent } from './schema.component';
import { MaterialModule } from 'src/app/models/MaterialModule';
import { FormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader';


@NgModule({
  declarations: [
    SchemaComponent
  ],
  imports: [
    CommonModule,
    SchemaRoutingModule,
    MaterialModule,
    FormsModule,
    NgHttpLoaderModule.forRoot(),
  ]
})
export class SchemaModule { }
