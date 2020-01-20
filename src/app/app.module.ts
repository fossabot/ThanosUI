import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './page/home/home.component';
import { SchemaComponent } from './page/schema/schema.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContractComponent } from './page/contract/contract.component';
import { MockComponent } from './page/mock/mock.component';
import { AboutComponent } from './page/about/about.component';
import {
  MatButtonModule,
  MatListModule,
  MatDividerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTabsModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SchemaComponent,
    ContractComponent,
    MockComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
