import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ContractService } from 'src/app/service/contract.service';
import { SchemaKeyImpl } from 'src/app/models/schema/SchemaKeyImpl';
import { MatDialog } from '@angular/material/dialog';
import { SchemadialogComponent } from 'src/app/component/schemadialog/schemadialog.component';
import { Mode } from 'src/app/models/schema/Mode';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent implements OnInit {

  displayedColumns: string[] = ['provider', 'name', 'version', 'actions', 'contract_action'];
  schemaList: SchemaKeyImpl[];
  dataSource = new MatTableDataSource(this.schemaList);
  contractService: ContractService;
  showSpinLoader = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(contractService: ContractService, public dialog: MatDialog) {
    this.getDataSource(contractService);
    this.contractService = contractService;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  getDataSource(contractService: ContractService) {
    this.showSpinLoader = true;
    contractService.getAllSchemaKeys().subscribe(response => {
      this.schemaList = response.map(res => new SchemaKeyImpl(res))
        .filter(schema => schema.isValid());
      this.refreshList(this.schemaList);
      this.showSpinLoader = false;
    });
  }

  refreshList(schemaList: SchemaKeyImpl[]) {
    this.dataSource.data = schemaList;
    console.log(this.dataSource.data);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteSchema(content: SchemaKeyImpl) {
    this.contractService.deleteSchema(content.id).subscribe(response => {
      const index = this.schemaList.findIndex(schema => schema === content);
      this.schemaList.splice(index, 1);
      this.refreshList(this.schemaList);
    }, error => {
      console.log('Fail to remove schema');
    });
  }
  viewSchema(content: SchemaKeyImpl) {
    const dialogRef = this.dialog.open(SchemadialogComponent, {
      width: '85%',
      data: {
        title: '查看接口详情',
        id: content.id,
        provider: content.provider,
        name: content.name,
        version: content.version,
        mode: Mode.READ,
        contractService: this.contractService
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  addSchema() {
    const dialogRef = this.dialog.open(SchemadialogComponent, {
      width: '85%',
      data: {
        title: '添加接口',
        id: '',
        provider: '',
        name: '',
        version: '',
        mode: Mode.ADD,
        contractService: this.contractService
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed from add');
      console.log(result);
      const schema: SchemaKeyImpl = new SchemaKeyImpl(result);
      if (schema.isValid()) {
        this.schemaList.push(result);
        this.refreshList(this.schemaList);
      }
    });
  }

  editSchema(content: SchemaKeyImpl) {
    const dialogRef = this.dialog.open(SchemadialogComponent, {
      width: '85%',
      data: {
        title: '编辑接口详情',
        id: content.id,
        provider: content.provider,
        name: content.name,
        version: content.version,
        mode: Mode.EDIT,
        contractService: this.contractService
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed for edit');
      console.log(result);
    });
  }

  transformMsg() {
    console.log('transformMsg - Not implement yet.');
  }

  duplicateSchema(content: SchemaKeyImpl) {
    console.log('duplicateSchema - Not implement yet.');
  }

}
