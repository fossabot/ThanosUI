import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mode } from 'src/app/models/schema/Mode';
import { SchemaField } from 'src/app/models/schema/SchemaField';
import { MatTableDataSource } from '@angular/material/table';
import { SchemaDialogData } from 'src/app/models/schema/SchemaDialogData';
import { SchemaDetailImpl } from 'src/app/models/schema/SchemaDetailImpl';

@Component({
  selector: 'app-schemadialog',
  templateUrl: './schemadialog.component.html',
  styleUrls: ['./schemadialog.component.scss']
})
export class SchemadialogComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'type', 'length', 'content', 'del'];
  alertMessage = '';
  alertDetail = '';
  isReadOnlyDesc = true;
  isReadOnlyFields = true;
  showSpinLoader = false;

  requestList: SchemaField[];
  responseList: SchemaField[];
  reqDataSource = new MatTableDataSource(this.requestList);
  resDataSource = new MatTableDataSource(this.responseList);

  incomingData: SchemaDialogData;
  schema: SchemaDetailImpl = new SchemaDetailImpl();
  emptyField: SchemaField = {
    name: '',
    type: '',
    content: '',
    length: 0
  };

  constructor(public dialogRef: MatDialogRef<SchemadialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SchemaDialogData) {

    console.log('-- In constructor --');
    this.incomingData = Object.assign({}, data);
    console.log(this.incomingData);
  }

  ngOnInit() {
    this.showSpinLoader = true;
    console.log('init is called');
    this.getSchemaDetail(this.incomingData);
    this.initPage();
    this.showSpinLoader = false;
  }

  getSchemaDetail(data: SchemaDialogData) {
    if (this.incomingData.mode === Mode.ADD) {
      this.initFieldList();
    } else {
      data.contractService.getSchemaDetailById(data.id).subscribe(response => {
        const temp = new SchemaDetailImpl(response);
        if (temp.isValid()) {
          this.schema = temp;
        }
        this.initFieldList();
      });
    }
  }

  initPage() {
    if (this.incomingData.mode as Mode === Mode.EDIT) {
      this.isReadOnlyFields = false;
    }
    if (this.incomingData.mode as Mode === Mode.ADD) {
      this.isReadOnlyDesc = false;
      this.isReadOnlyFields = false;
    }
  }

  private initFieldList() {
    if (!this.schema.request) {
      this.requestList = [this.emptyField];
    } else {
      this.requestList = this.schema.request;
    }
    this.reqDataSource.data = this.requestList;

    if (!this.schema.response) {
      this.responseList = [this.emptyField];
    } else {
      this.responseList = this.schema.response;
    }
    this.resDataSource.data = this.responseList;
  }

  onSubmit() {
    console.log('onSubmit is called');
    if (this.schema.id === '') {
      // this is for add
    } else {
      this.incomingData.contractService.updateSchemaDetail(this.schema).subscribe(response => {
        console.log('Successfully update the schema');
        this.dialogRef.close();
      },
        error => {
          this.alertMessage = 'Fail to update schema, please exit and retry later';
          this.alertDetail = error.error;
          console.log(this.alertMessage);
        });
    }
  }

  onNoClick(): void {
    console.log('onNoClick is called');
    this.dialogRef.close();
  }

  delete(index: number, fieldList: SchemaField[], dataSource: any) {
    console.log('Going to remove entry ' + index);
    fieldList.splice(index, 1);
    dataSource.data = fieldList;
  }

  addField(index: number, fieldList: SchemaField[], dataSource: any) {
    console.log('going to add item behind ' + index);
    fieldList.splice(index + 1, 0, this.emptyField);
    dataSource.data = fieldList;
  }

}
