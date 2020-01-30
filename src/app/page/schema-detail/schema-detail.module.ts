import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemaDetailRoutingModule } from './schema-detail-routing.module';
import { SchemaDetailComponent } from './schema-detail.component';
import { MaterialModule } from 'src/app/models/MaterialModule';
import { FormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { DetailHeaderComponent } from 'src/app/component/detail-header/detail-header.component';
import { ShareModuleModule } from 'src/app/common/share-module/share-module.module';


@NgModule({
  declarations: [
    SchemaDetailComponent
  ],
  imports: [
    CommonModule,
    SchemaDetailRoutingModule,
    MaterialModule,
    FormsModule,
    ShareModuleModule,
    NgHttpLoaderModule.forRoot(),
  ]
})
export class SchemaDetailModule { }
