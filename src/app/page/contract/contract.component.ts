import { Component, OnInit, ViewChild } from '@angular/core';
import { ContractKeyImpl } from 'src/app/models/contract/ContractKeyImpl';
import { ContractService } from 'src/app/service/contract.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { ContractKey } from 'src/app/models/contract/ContractKey';
import { Router } from '@angular/router';
import { Mode } from 'src/app/models/Mode';
import { ConfirmDialogComponent } from 'src/app/component/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  displayedColumns: string[] = ['provider', 'consumer', 'name', 'version', 'actions'];
  contractList: ContractKeyImpl[];
  dataSource = new MatTableDataSource(this.contractList);
  showSpinLoader = false;
  allertMessage = '';

  globalFilter = '';
  providerFilter = new FormControl();
  consumerFilter = new FormControl();
  nameFilter = new FormControl();
  versionFilter = new FormControl();

  filteredValues = {
    provider: '',
    consumer: '',
    name: '',
    version: ''
  };

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  customFilterPredicate: (data: ContractKeyImpl, filter: string) => boolean;

  constructor(public contractService: ContractService, public router: Router, public dialog: MatDialog) {
    try {
      if (router.getCurrentNavigation()) {
        const state = router.getCurrentNavigation().extras.state;
        console.log(state);
        this.filteredValues.provider = state.provider ? state.provider : '';
        this.filteredValues.consumer = state.consumer ? state.consumer : '';
        this.filteredValues.name = state.name ? state.name : '';
        this.filteredValues.version = state.version ? state.version : '';
        console.log(this.filteredValues);
      }
    } catch (e) {
      console.log('No preset default state');
    }
  }


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.contractService.getAllContractKeys().subscribe(response => {
      this.contractList = response.map(res => new ContractKeyImpl(res));
      this.refreshList();
    });

    this.initFilters();
    window.scrollTo(0, 0);
  }

  private initFilters() {
    this.providerFilter.valueChanges.subscribe((providerFilterValue) => {
      this.filteredValues.provider = providerFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.consumerFilter.valueChanges.subscribe((consumerFilterValue) => {
      this.filteredValues.consumer = consumerFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
      this.filteredValues.name = nameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.versionFilter.valueChanges.subscribe((versionFilterValue) => {
      this.filteredValues.version = versionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.dataSource.filterPredicate = (data: ContractKey, filter: string) => {
      let globalMatch = !this.globalFilter;
      if (this.globalFilter) {
        globalMatch = this.match(data.provider, this.globalFilter) ||
          this.match(data.consumer, this.globalFilter) ||
          this.match(data.name, this.globalFilter) ||
          this.match(data.version, this.globalFilter);
      }
      if (!globalMatch) {
        return;
      }
      const searchString = JSON.parse(filter);
      return this.match(data.provider, searchString.provider) &&
        this.match(data.consumer, searchString.consumer) &&
        this.match(data.version, searchString.version) &&
        this.match(data.name, searchString.name);
    };
  }

  private match(data: any, searchString: any): boolean {
    return data.toString().trim().toLowerCase()
      .indexOf(searchString.toLowerCase()) !== -1;
  }



  refreshList() {
    this.dataSource.data = this.contractList;
    console.log(this.dataSource.data);
  }

  applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    this.globalFilter = filterValue;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  viewContract(element: ContractKeyImpl) {
    this.router.navigateByUrl('/detail/contract', { state: { mode: Mode.READ, data: element } });
  }
  editContract(element: ContractKeyImpl) {
    this.router.navigateByUrl('/detail/contract', { state: { mode: Mode.EDIT, data: element } });
  }
  deleteContract(element: ContractKeyImpl) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {title: 'Attention', message: 'Really delete this contract?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.contractService.deleteContract(element.id).subscribe(response => {
          const index = this.contractList.findIndex(schema => schema === element);
          this.contractList.splice(index, 1);
          this.refreshList();
        }, error => {
          this.allertMessage = error.error;
          console.log('Fail to remove contract');
        });
      } else {
        console.log('Confirmed not to proceed delete');
      }
    });
  }
  duplicateContract(element: ContractKeyImpl) {
    this.router.navigateByUrl('/detail/contract', { state: { mode: Mode.DUPLICATE, data: element } });
  }

  resetFilter() {
    this.globalFilter = '';
    this.filteredValues = {
      provider: '',
      consumer: '',
      name: '',
      version: ''
    };
  }

}
