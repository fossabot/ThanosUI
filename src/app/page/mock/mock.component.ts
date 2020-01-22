import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MockMapping } from 'src/app/models/MockMapping';
import { MockServerService } from 'src/app/service/mockserver.service';
import { MockMappingDTO } from 'src/app/models/MockMappingDTO';
import { MatPaginator } from '@angular/material/paginator';


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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(mockServerService: MockServerService) {
    this.getDataSource(mockServerService);
  }

  getDataSource(mockServerService: MockServerService) {
    mockServerService.getMapping().subscribe(response => {
      this.dataSource.data = response.map(res => new MockMappingDTO(res))
        .filter(dto => dto.isValid())
        .map(mapping => mapping.toMockMapping());
      console.log(this.dataSource.data);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
