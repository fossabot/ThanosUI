import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mode } from 'src/app/models/Mode';
import { SchemaField } from 'src/app/models/SchemaField';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-schemadialog',
  templateUrl: './schemadialog.component.html',
  styleUrls: ['./schemadialog.component.scss']
})
export class SchemadialogComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'type', 'length', 'content', 'del'];

  isReadOnlyDesc = true;
  isReadOnlyFields = true;

  requestList: SchemaField[];
  responseList: SchemaField[];
  reqDataSource = new MatTableDataSource(this.requestList);
  resDataSource = new MatTableDataSource(this.responseList);

  updateSource: any;
  oriSource: any;

  constructor(public dialogRef: MatDialogRef<SchemadialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('constructor: ' + data);
    this.oriSource = data;
  }

  ngOnInit() {
    console.log('init is called');
    this.updateSource = this.oriSource;
    this.initPage(this.updateSource);
    console.log('oriSource: ' + this.oriSource.schema);
    console.log('updateSource: ' + this.updateSource.schema);
  }

  initPage(source: any) {
    if (source.mode as Mode === Mode.EDIT) {
      this.isReadOnlyFields = false;
    }
    if (source.mode as Mode === Mode.ADD) {
      this.isReadOnlyDesc = false;
      this.isReadOnlyFields = false;
    }

    if (!source.schema.request) {
      this.requestList = [new SchemaField('', '', '')];
    } else {
      this.requestList = source.schema.request;
    }
    this.reqDataSource.data = this.requestList ;

    if (!source.schema.response) {
      this.responseList = [new SchemaField('', '', '')];
    } else {
      this.responseList = source.schema.response;
    }
    this.resDataSource.data = this.responseList;
  }

  onSubmit() {
    console.log('onSubmit is called');
  }
  delete(index: number, fieldList: SchemaField[], dataSource: any) {
    console.log('Going to remove entry ' + index);
    fieldList.splice(index, 1);
    dataSource.data = fieldList;
  }

  addField(index: number, fieldList: SchemaField[], dataSource: any) {
    console.log('going to add item behind ' + index);
    fieldList.splice(index + 1, 0, new SchemaField('', '', ''));
    dataSource.data = fieldList;
  }

}
