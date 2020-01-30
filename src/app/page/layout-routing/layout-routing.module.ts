import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingRoutingModule } from './layout-routing-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { DetailLayoutComponent } from './detail-layout/detail-layout.component';
import { HeaderComponent } from 'src/app/component/header/header.component';
import { FooterComponent } from 'src/app/component/footer/footer.component';
import { MaterialModule } from 'src/app/models/MaterialModule';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/models/CoreModule';
import { MockModule } from '../mock/mock.module';
import { HomeModule } from '../home/home.module';
import { ContractModule } from '../contract/contract.module';
import { SchemaModule } from '../schema/schema.module';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { SchemadialogComponent } from 'src/app/component/schemadialog/schemadialog.component';
import { ConfirmDialogComponent } from 'src/app/component/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    DetailLayoutComponent,
    HeaderComponent,
    FooterComponent,
    SchemadialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingRoutingModule,
    MaterialModule,
    FormsModule,
    CoreModule,
    MockModule,
    HomeModule,
    ContractModule,
    SchemaModule,
    NgHttpLoaderModule.forRoot(),
  ],
  exports: [
    MainLayoutComponent,
    DetailLayoutComponent
  ],
  entryComponents: [
    SchemadialogComponent,
    ConfirmDialogComponent
  ],
})
export class LayoutRoutingModule { }
