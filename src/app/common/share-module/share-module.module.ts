import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailHeaderComponent } from 'src/app/component/detail-header/detail-header.component';
import { MaterialModule } from 'src/app/common/MaterialModule';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DetailHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    DetailHeaderComponent
  ]
})
export class ShareModuleModule { }
