import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './models/MaterialModule';
import { CoreModule } from './models/CoreModule';
import { FormsModule } from '@angular/forms';
import { MockModule } from './page/mock/mock.module';
import { HomeModule } from './page/home/home.module';
import { ContractModule } from './page/contract/contract.module';
import { AboutModule } from './page/about/about.module';
import { SchemaModule } from './page/schema/schema.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    MockModule,
    HomeModule,
    ContractModule,
    AboutModule,
    SchemaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
