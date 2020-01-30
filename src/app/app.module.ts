import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutRoutingModule } from './page/layout-routing/layout-routing.module';
import { NotifyDialogComponent } from './component/notify-dialog/notify-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    LayoutRoutingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
