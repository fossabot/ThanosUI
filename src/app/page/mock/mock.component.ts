import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MockServerService } from 'src/app/service/mockserver.service';
import { MockMappingDTO } from 'src/app/models/mockmapping/MockMappingDTO';
import { MatPaginator } from '@angular/material/paginator';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { TcpRequestDTO } from 'src/app/models/mockmapping/TcpRequestDTO';
import { ContractService } from 'src/app/service/contract.service';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.scss']
})
export class MockComponent implements OnInit {

  displayedColumns: string[] = ['provider', 'consumer', 'port'];
  dataSource = new MatTableDataSource();
  model = new TcpRequestDTO('127.0.0.1', null, '');
  contractService: ContractService;
  response = '';
  showSpinLoader = false;
  noRecord = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    window.scrollTo(0, 0);
  }

  constructor(mockServerService: MockServerService,
              contractService: ContractService,
              private ngZone: NgZone) {
    this.contractService = contractService;
    this.getDataSource(mockServerService);

  }

  getDataSource(mockServerService: MockServerService) {
    this.showSpinLoader = true;
    mockServerService.getMapping().subscribe(response => {
      this.dataSource.data = response.map(res => new MockMappingDTO(res))
        .filter(dto => dto.isValid())
        .map(mapping => mapping.toMockMapping());
      console.log(this.dataSource.data);
      this.showSpinLoader = false;
      this.noRecord = false;
    }, err => {
      console.log('HTTP error', err);
    }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onSubmit() {
    console.log(JSON.stringify(this.model));
    this.contractService.postTcpRequest(this.model).subscribe(response => {
      this.response = response.response;
      console.log(response);
    });
  }
}
