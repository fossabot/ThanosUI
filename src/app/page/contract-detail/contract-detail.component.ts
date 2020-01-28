import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractService } from 'src/app/service/contract.service';
import { SchemaDetailImpl } from 'src/app/models/schema/SchemaDetailImpl';
import { ContractDetailImpl } from 'src/app/models/contract/ContractDetailImpl';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})
export class ContractDetailComponent implements OnInit {

  subTitle = '契约详情 / Contract Detail';
  allertMessage = '';
  contractDetail: ContractDetailImpl;

  isReadOnlyDesc = false;
  isReadOnlyFields = false;

  displayedColumns: string[] = ['id', 'name', 'type', 'length', 'schemaContent', 'contractContent'];

  constructor(private route: ActivatedRoute, public contractService: ContractService) {
    this.contractDetail = new ContractDetailImpl(null, null);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const schemaId = params.get('schemaId');
      this.contractService.getSchemaDetailById(schemaId).subscribe(response => {
        this.contractDetail = new SchemaDetailImpl(response).toContractDetailImpl();
        this.contractDetail.schemaId = schemaId;
      });
    });
    console.log(this.contractDetail);
  }

  onSubmit() {
    if (this.contractDetail.containAtLessOneField()) {
      console.log(this.contractDetail);
      this.contractService.addContract(this.contractDetail).subscribe(response => {
        console.log('Contract saved');
      });
    } else {
      this.allertMessage = 'At less need to define 1 request field and 1 response field.';
      console.log(this.allertMessage);
    }
  }

}
