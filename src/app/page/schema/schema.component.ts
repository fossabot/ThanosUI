import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ContractService } from 'src/app/service/contract.service';
import { SchemaKeyImpl } from 'src/app/models/schema/SchemaKeyImpl';
import { MatDialog } from '@angular/material/dialog';
import { Mode } from 'src/app/models/Mode';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/component/confirm-dialog/confirm-dialog.component';

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

  constructor(contractService: ContractService, public dialog: MatDialog, public router: Router) {
    this.getDataSource(contractService);
    this.contractService = contractService;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    window.scrollTo(0, 0);
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {title: 'Attention', message: 'Really going to delete this schema?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contractService.deleteSchema(content.id).subscribe(response => {
          const index = this.schemaList.findIndex(schema => schema === content);
          this.schemaList.splice(index, 1);
          this.refreshList(this.schemaList);
        }, error => {
          console.log('Fail to remove schema');
        });
      } else {
        console.log('Confirmed not to proceed delete');
      }
    });
  }
  viewSchema(content: SchemaKeyImpl) {
    this.router.navigateByUrl('/detail/schema', { state: { mode: Mode.READ, data: content } });
  }

  addSchema() {
    this.router.navigateByUrl('/detail/schema');
  }

  editSchema(content: SchemaKeyImpl) {
    console.log(content);
    this.router.navigateByUrl('/detail/schema', { state: { mode: Mode.EDIT, data: content } });
  }

  transformMsg() {
    console.log('transformMsg - Not implement yet.');
  }

  duplicateSchema(content: SchemaKeyImpl) {
    console.log(content);
    this.router.navigateByUrl('/detail/schema', { state: { mode: Mode.DUPLICATE, data: content } });
  }

  addContract(content: SchemaKeyImpl) {
    this.router.navigateByUrl('/detail/contract', { state: { mode: Mode.ADD, data: content } });
  }

  searchContract(content: SchemaKeyImpl) {
    this.router.navigateByUrl('/contract', { state: content });
  }

}
