import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MockMapping } from 'src/app/models/MockMapping';
import { MockServerService } from 'src/app/service/mockserver.service';


const ELEMENT_DATA: MockMapping[] = [
  { provider: 'provider', consumer: 'consumer1', port: 12345 },
  { provider: 'provider', consumer: 'consumer2', port: 12345 },
  { provider: 'provider', consumer: 'consumer3', port: 12345 },
  { provider: 'provider', consumer: 'consumer4', port: 12345 },
  { provider: 'provider', consumer: 'consumer5', port: 12345 },
  { provider: 'provider', consumer: 'consumer6', port: 12345 },
  { provider: 'provider', consumer: 'consumer7', port: 12345 },
  { provider: 'provider', consumer: 'consumer8', port: 12345 },
  { provider: 'provider', consumer: 'consumer9', port: 12345 },
  { provider: 'provider', consumer: 'consumer10', port: 12345 },
  { provider: 'provider', consumer: 'consumer11', port: 12345 },
  { provider: 'provider', consumer: 'consumer12', port: 12345 },
  { provider: 'provider', consumer: 'consumer13', port: 12345 },
];

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
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  mappings: MockMapping[];

  constructor(mockServerService: MockServerService) {
    mockServerService.getMapping().subscribe(response => {
      this.mappings = response;
      console.log(this.mappings);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
  }
}
