import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './models/MaterialModule';
import { CoreModule } from './models/CoreModule';
import { MockModule } from './page/mock/mock.module';
import { HomeModule } from './page/home/home.module';
import { ContractModule } from './page/contract/contract.module';
import { SchemaModule } from './page/schema/schema.module';
import { SchemadialogComponent } from './component/schemadialog/schemadialog.component';
import { FormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SchemadialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    CoreModule,
    MockModule,
    HomeModule,
    ContractModule,
    SchemaModule,
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SchemadialogComponent]
})
export class AppModule { }
