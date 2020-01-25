import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ContractService } from 'src/app/service/contract.service';
import { SchemaDTO } from 'src/app/models/SchemaDTO';
import { MatDialog } from '@angular/material/dialog';
import { SchemadialogComponent } from 'src/app/component/schemadialog/schemadialog.component';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent implements OnInit {

  displayedColumns: string[] = ['provider', 'name', 'version', 'actions'];
  schemaList: SchemaDTO[];
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
      this.schemaList = response.map(res => new SchemaDTO(res));
      // .filter(dto => dto.isValid())
      // .map(mapping => mapping.toMockMapping());
      this.refreshList(this.schemaList);
    });
  }

  refreshList(schemaList: SchemaDTO[]) {
    this.dataSource.data = schemaList;
    console.log(this.dataSource.data);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  viewSchema(schemaDTO: SchemaDTO) {
    const dialogRef = this.dialog.open(SchemadialogComponent, {
      width: '70%',
      data: {
        title: '查看接口详情',
        schema: schemaDTO
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addSchema() {
    const dialogRef = this.dialog.open(SchemadialogComponent, {
      width: '70%',
      data: {
        title: '添加接口',
        schema: new SchemaDTO()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      const schema: SchemaDTO = new SchemaDTO(result);
      if (schema.isValid()) {
        this.schemaList.push(result);
        this.refreshList(this.schemaList);
      }
    });
  }

  editSchema(schemaDTO: SchemaDTO) {
    const dialogRef = this.dialog.open(SchemadialogComponent, {
      width: '70%',
      data: {
        title: '编辑接口详情',
        schema: schemaDTO
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      const schema: SchemaDTO = new SchemaDTO(result);
      if (schema.isValid()) {
        const index = this.schemaList.findIndex(x => x.id === schemaDTO.id);
        this.schemaList[index] = result;
        this.refreshList(this.schemaList);
      }
    });
  }

}
