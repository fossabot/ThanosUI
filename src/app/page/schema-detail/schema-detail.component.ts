import { Component, OnInit } from '@angular/core';
import { SchemaField } from 'src/app/models/schema/SchemaField';
import { MatTableDataSource } from '@angular/material/table';
import { SchemaDetailImpl } from 'src/app/models/schema/SchemaDetailImpl';
import { ContractService } from 'src/app/service/contract.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Mode } from 'src/app/models/Mode';
import { SchemaKey } from 'src/app/models/schema/SchemaKey';
import { Location } from '@angular/common';
import { MockServerService } from 'src/app/service/mockserver.service';

@Component({
  selector: 'app-schema-detail',
  templateUrl: './schema-detail.component.html',
  styleUrls: ['./schema-detail.component.scss']
})
export class SchemaDetailComponent implements OnInit {

  subTitle = '接口详情 / Schema Detail';
  displayedColumns: string[] = ['id', 'name', 'type', 'length', 'content', 'del'];
  isReadOnlyDesc = false;
  isReadOnlyFields = false;
  showSpinLoader = false;
  stateMode: Mode;
  alertMessage = '';
  alertDetail = '';
  requestList: SchemaField[];
  responseList: SchemaField[];
  reqDataSource = new MatTableDataSource(this.requestList);
  resDataSource = new MatTableDataSource(this.responseList);

  schemaKey: SchemaKey;

  // incomingData: SchemaDialogData;
  schema: SchemaDetailImpl = new SchemaDetailImpl();

  constructor(public contractService: ContractService, public mockServerService: MockServerService,
              public location: Location, public router: Router, public snackBar: MatSnackBar) {
    try {
      if (router.getCurrentNavigation()) {
        this.stateMode = router.getCurrentNavigation().extras.state.mode;
        this.schemaKey = router.getCurrentNavigation().extras.state.data;
        this.initPageWithSchemaKey(this.schemaKey);
        if (this.stateMode === Mode.READ) {
          this.isReadOnlyDesc = true;
          this.isReadOnlyFields = true;
        }
      }
    } catch (e) {  // this is for newly add
      console.log(e);
      this.initSchemaKey();
      this.initFieldList();
    }
  }

  initSchemaKey() {
    this.schemaKey = {
      id: null,
      provider: '',
      name: '',
      version: '',
    };
  }

  initPageWithSchemaKey(schemaKeyFromState: SchemaKey) {
    this.contractService.getSchemaDetailById(schemaKeyFromState.id).subscribe(response => {
      const temp = new SchemaDetailImpl(response);
      if (temp.isValid()) {
        this.schema = temp;
        if (this.stateMode === Mode.DUPLICATE) {
          this.schema.id = '';
          this.schemaKey.name = temp.name + ' copy';
        }
      }
      this.initFieldList();
    });
  }

  private initFieldList() {
    if (!this.schema.request) {
      this.requestList = [{
        name: '',
        type: '',
        content: '',
        length: 0
      }];
    } else {
      this.requestList = this.schema.request;
    }
    this.reqDataSource.data = this.requestList;

    if (!this.schema.response) {
      this.responseList = [{
        name: '',
        type: '',
        content: '',
        length: 0
      }];
    } else {
      this.responseList = this.schema.response;
    }
    this.resDataSource.data = this.responseList;
  }
  ngOnInit() {
    window.scrollTo(0, 0);
  }

  onSubmit() {
    console.log('onSubmit is called');
    console.log(this.schema);
    if (!this.schema.id || this.schema.id === '') {
      // this is for ADD and duplicate
      this.schema.provider = this.schemaKey.provider;
      this.schema.name = this.schemaKey.name;
      this.schema.version = this.schemaKey.version;
      this.schema.request = this.requestList;
      this.schema.response = this.responseList;
      console.log(this.schema);

      this.contractService.addSchemaDetail(this.schema).subscribe(response => {
        this.notifyMockServer();
        this.location.back();
      },
        error => {
          this.alertMessage = 'Fail to add schema, please exit and retry later';
          this.alertDetail = error.error;
          console.log(this.alertDetail);
        });
    } else {
      console.log(this.schema);
      // this is for edit
      this.contractService.updateSchemaDetail(this.schema).subscribe(response => {
        this.alertMessage = '';
        this.alertDetail = '';
        this.notifyMockServer();
        this.location.back();
      },
        error => {
          this.alertMessage = 'Fail to update schema, please exit and retry later';
          this.alertDetail = error.error;
          console.log(this.alertDetail);
        });
    }
  }

  private notifyMockServer() {
    this.mockServerService.notifySchemaAddOrUpdate(this.schema).subscribe(result => {
      this.snackBar.open('Schema saved and notified mock server', 'Noted', {
        duration: 3000,
      });
    }, err => {
      this.snackBar.open('Schema saved and but fail to notify mock server', 'Noted', {
        duration: 5000,
      });
    });
  }

  delete(index: number, fieldList: SchemaField[], dataSource: any) {
    console.log('Going to remove entry ' + index);
    fieldList.splice(index, 1);
    dataSource.data = fieldList;
  }

  addField(index: number, fieldList: SchemaField[], dataSource: any) {
    console.log('going to add item behind ' + index);
    fieldList.splice(index + 1, 0, {
      name: '',
      type: '',
      content: '',
      length: 0
    });
    dataSource.data = fieldList;
  }

}
