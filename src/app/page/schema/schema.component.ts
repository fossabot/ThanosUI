import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ContractService } from 'src/app/service/contract.service';
import { Schema } from 'src/app/models/Schema';
import { MatDialog } from '@angular/material/dialog';
import { SchemadialogComponent } from 'src/app/component/schemadialog/schemadialog.component';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent implements OnInit {

  displayedColumns: string[] = ['provider', 'name', 'version', 'actions'];
  schemaList: Schema[];
  dataSource = new MatTableDataSource(this.schemaList);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(contractService: ContractService, public dialog: MatDialog) {
    this.getDataSource(contractService);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  getDataSource(contractService: ContractService) {
    contractService.getAllSchemas().subscribe(response => {
      this.schemaList = response.map(res => new Schema(res))
        .filter(schema => schema.isValid());
      this.refreshList(this.schemaList);
    });
  }

  refreshList(schemaList: Schema[]) {
    this.dataSource.data = schemaList;
    console.log(this.dataSource.data);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  viewSchema(content: Schema) {
    const dialogRef = this.dialog.open(SchemadialogComponent, {
      width: '80%',
      data: {
        title: '查看接口详情',
        schema: content
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  addSchema() {
    const dialogRef = this.dialog.open(SchemadialogComponent, {
      width: '80%',
      data: {
        title: '添加接口',
        schema: new Schema()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      const schema: Schema = new Schema(result);
      if (schema.isValid()) {
        this.schemaList.push(result);
        this.refreshList(this.schemaList);
      }
    });
  }

  editSchema(content: Schema) {
    const dialogRef = this.dialog.open(SchemadialogComponent, {
      width: '80%',
      data: {
        title: '编辑接口详情',
        schema: content
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      const temp: Schema = new Schema(result);
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

  downloadYml(content: Schema){
    console.log('transformMsg - Not implement yet.');
  }

}
