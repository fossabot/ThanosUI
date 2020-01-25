import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Schema } from 'src/app/models/Schema';
import { NgModel } from '@angular/forms';
import { Mode } from 'src/app/models/Mode';

@Component({
  selector: 'app-schemadialog',
  templateUrl: './schemadialog.component.html',
  styleUrls: ['./schemadialog.component.scss']
})
export class SchemadialogComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'type', 'length', 'content'];
  schemaList: Schema[];
  isReadOnlyDesc = true;
  isReadOnlyFields = true;

  constructor(public dialogRef: MatDialogRef<SchemadialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    if (data.mode as Mode === Mode.EDIT) {
      this.isReadOnlyFields = false;
    }
    if (data.mode as Mode === Mode.ADD) {
      this.isReadOnlyDesc = false;
    }
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
