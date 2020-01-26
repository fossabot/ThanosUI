import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ContractService } from 'src/app/service/contract.service';
import { SchemaImpl } from 'src/app/models/SchemaImpl';
import { MatDialog } from '@angular/material/dialog';
import { SchemadialogComponent } from 'src/app/component/schemadialog/schemadialog.component';
import { Mode } from 'src/app/models/Mode';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent implements OnInit {

  displayedColumns: string[] = ['provider', 'name', 'version', 'actions'];
  schemaList: SchemaImpl[];
  dataSource = new MatTableDataSource(this.schemaList);
  contractService: ContractService;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(contractService: ContractService, public dialog: MatDialog) {
    this.getDataSource(contractService);
    this.contractService = contractService;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  getDataSource(contractService: ContractService) {
    contractService.getAllSchemas().subscribe(response => {
      this.schemaList = response.map(res => new SchemaImpl(res))
        .filter(schema => schema.isValid());
      this.refreshList(this.schemaList);
    });
  }

  refreshList(schemaList: SchemaImpl[]) {
    this.dataSource.data = schemaList;
    console.log(this.dataSource.data);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  viewSchema(content: SchemaImpl) {
    const dialogRef = this.dialog.open(SchemadialogComponent, {
      width: '85%',
      data: {
        title: '查看接口详情',
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
        provider: '',
        name: '',
        version: '',
        mode: Mode.ADD,
        contractService: this.contractService
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      const schema: SchemaImpl = new SchemaImpl(result);
      if (schema.isValid()) {
        this.schemaList.push(result);
        this.refreshList(this.schemaList);
      }
    });
  }

  editSchema(content: SchemaImpl) {
    const dialogRef = this.dialog.open(SchemadialogComponent, {
      width: '85%',
      data: {
        title: '编辑接口详情',
        provider: content.provider,
        name: content.name,
        version: content.version,
        mode: Mode.EDIT,
        contractService: this.contractService
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      const temp: SchemaImpl = new SchemaImpl(result);
      if (temp.isValid()) {
        const index = this.schemaList.findIndex(x => x.id === temp.id);
        this.schemaList[index] = result;
        this.refreshList(this.schemaList);
      }
    });
  }

  transformMsg() {
    console.log('transformMsg - Not implement yet.');
  }

  downloadYml(content: SchemaImpl) {
    console.log('transformMsg - Not implement yet.');
  }

}
