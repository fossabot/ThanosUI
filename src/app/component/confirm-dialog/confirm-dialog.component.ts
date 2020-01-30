import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenericDialogData } from 'src/app/models/GenericDialogData';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  title = '';
  message = '';

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GenericDialogData) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
  }

  onNot() {
    this.dialogRef.close(false);
  }

  onOK() {
    this.dialogRef.close(true);
  }

}
