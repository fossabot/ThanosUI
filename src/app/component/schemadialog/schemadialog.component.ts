import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Schema } from 'src/app/models/Schema';

@Component({
  selector: 'app-schemadialog',
  templateUrl: './schemadialog.component.html',
  styleUrls: ['./schemadialog.component.scss']
})
export class SchemadialogComponent implements OnInit {

  displayedColumns: string[] = ['name', 'type', 'length', 'content'];
  schemaList: Schema[];

  constructor(public dialogRef: MatDialogRef<SchemadialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Schema) {
    console.log(data);
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    console.log('onSubmit is called');
  }
}
