import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemaRoutingModule } from './schema-routing.module';
import { SchemaComponent } from './schema.component';


@NgModule({
  declarations: [SchemaComponent],
  imports: [
    CommonModule,
    SchemaRoutingModule
  ]
})
export class SchemaModule { }
