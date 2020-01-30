import { Component, OnInit, Inject } from '@angular/core';
import { CommonDialogData } from 'src/app/models/CommonDialogData';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  title = '';
  message = '';

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CommonDialogData) {
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
