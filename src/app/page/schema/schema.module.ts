import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemaRoutingModule } from './schema-routing.module';
import { SchemaComponent } from './schema.component';
import { MaterialModule } from 'src/app/models/MaterialModule';


@NgModule({
  declarations: [SchemaComponent],
  imports: [
    CommonModule,
    SchemaRoutingModule,
    MaterialModule
  ]
})
export class SchemaModule { }
