import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractService } from 'src/app/service/contract.service';
import { SchemaDetailImpl } from 'src/app/models/schema/SchemaDetailImpl';
import { ContractDetailImpl } from 'src/app/models/contract/ContractDetailImpl';
import { Location } from '@angular/common';
import { Mode } from 'src/app/models/Mode';
import { SchemaKeyImpl } from 'src/app/models/schema/SchemaKeyImpl';

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
  deny = false;

  stateMode: Mode;
  displayedColumns: string[] = ['id', 'name', 'type', 'length', 'schemaContent', 'contractContent'];

  constructor(private route: ActivatedRoute, public contractService: ContractService, public location: Location, public router: Router) {
    this.contractDetail = new ContractDetailImpl('', '', '', '', null, null);
    try {
      if (router.getCurrentNavigation()) {
        this.stateMode = router.getCurrentNavigation().extras.state.mode;
        console.log(this.stateMode);
        if (this.stateMode === Mode.ADD) {
          const schemaKeyFromState = router.getCurrentNavigation().extras.state.data;
          this.initPageWithSchemaKey(schemaKeyFromState);
        } else {
          this.contractDetail = router.getCurrentNavigation().extras.state.data;
        }
      }
    } catch (e) {
      console.log(e);
      this.deny = true;
    }
  }

  ngOnInit() {

  }

  private initPageWithSchemaKey(schemaKeyFromState: SchemaKeyImpl) {
    const schemaId = schemaKeyFromState.id;
    this.contractService.getSchemaDetailById(schemaId).subscribe(response => {
      this.contractDetail = new SchemaDetailImpl(response).toContractDetailImpl();
      this.contractDetail.schemaId = schemaId;
      this.contractDetail.provider = schemaKeyFromState.provider;
      this.contractDetail.schemaProvider = schemaKeyFromState.provider;
      this.contractDetail.schemaName = schemaKeyFromState.name;
      this.contractDetail.schemaVersion = schemaKeyFromState.version;
      console.log(this.contractDetail);
    });
  }

  onSubmit() {
    if (this.contractDetail.containAtLessOneField()) {
      console.log(this.contractDetail);
      this.contractService.addContract(this.contractDetail).subscribe(response => {
        console.log('Contract saved');
        this.location.back();
      });
    } else {
      this.allertMessage = 'At less need to define 1 request field and 1 response field.';
      console.log(this.allertMessage);
    }
  }

}
