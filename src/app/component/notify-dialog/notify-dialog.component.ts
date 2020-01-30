import { Component, OnInit, Inject } from '@angular/core';
import { GenericDialogData } from 'src/app/models/GenericDialogData';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notify-dialog',
  templateUrl: './notify-dialog.component.html',
  styleUrls: ['./notify-dialog.component.scss']
})
export class NotifyDialogComponent implements OnInit {

  title = '';
  message = '';

  constructor(public dialogRef: MatDialogRef<NotifyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GenericDialogData) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
  }

  onOK() {
    this.dialogRef.close();
  }

}
