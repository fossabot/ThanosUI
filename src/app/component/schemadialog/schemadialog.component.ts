import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SchemaDTO } from 'src/app/models/SchemaDTO';

@Component({
  selector: 'app-schemadialog',
  templateUrl: './schemadialog.component.html',
  styleUrls: ['./schemadialog.component.scss']
})
export class SchemadialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<SchemadialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: SchemaDTO) {
                 console.log(data);
               }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
