import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractService } from 'src/app/service/contract.service';
import { SchemaDetailImpl } from 'src/app/models/schema/SchemaDetailImpl';
import { ContractDetailImpl } from 'src/app/models/contract/ContractDetailImpl';
import { Location } from '@angular/common';
import { Mode } from 'src/app/models/Mode';
import { SchemaKeyImpl } from 'src/app/models/schema/SchemaKeyImpl';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MockServerService } from 'src/app/service/mockserver.service';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})
export class ContractDetailComponent implements OnInit {

  subTitle = '契约详情 / Contract Detail';
  alertMessage = '';
  contractDetail: ContractDetailImpl = new ContractDetailImpl();

  isReadOnlyDesc = false;
  isReadOnlyFields = false;
  deny = false;

  stateMode: Mode;
  displayedColumns: string[] = ['id', 'name', 'type', 'length', 'schemaContent', 'contractContent'];

  constructor(public contractService: ContractService, public mockServerService: MockServerService,
              public location: Location, public router: Router, public snackBar: MatSnackBar) {
    try {
      if (router.getCurrentNavigation()) {
        this.stateMode = router.getCurrentNavigation().extras.state.mode;
        console.log(this.stateMode);
        if (this.stateMode === Mode.ADD) {
          const schemaKeyFromState = router.getCurrentNavigation().extras.state.data;
          this.initPageWithSchemaKey(schemaKeyFromState);
        } else { // EDIT & VIEW & DUPLICATE
          const contractKey = router.getCurrentNavigation().extras.state.data;
          this.contractService.getContractById(contractKey.id).subscribe(response => {
            console.log(response);
            this.contractDetail = new ContractDetailImpl(response);
          });
          if (this.stateMode === Mode.READ) {
            this.isReadOnlyFields = true;
            this.isReadOnlyDesc = true;
          }
          if (this.stateMode === Mode.DUPLICATE) {
            this.contractDetail.name = this.contractDetail.name + ' copy';
          }
          console.log(this.contractDetail);
        }

      }
    } catch (e) {
      console.log(e);
      this.deny = true;
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
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
      if (this.stateMode === Mode.ADD || this.stateMode === Mode.DUPLICATE) {
        this.contractDetail.id = null;
        this.contractService.addContract(this.contractDetail).subscribe(response => {
          this.notifyMockServer();
          this.location.back();
        });
      } else {
        this.contractService.updateContractDetail(this.contractDetail).subscribe(response => {
          this.notifyMockServer();
          this.location.back();
        });
      }
    } else {
      this.alertMessage = 'At less need to define 1 request field and 1 response field.';
      console.log(this.alertMessage);
    }
  }

  private notifyMockServer() {
    this.mockServerService.notifyContractAddOrUpdate(this.contractDetail).subscribe(result => {
      this.snackBar.open('Contract saved and notified mock server', 'Noted', {
        duration: 2000,
      });
    }, err => {
      this.snackBar.open('Contract saved and but fail to notify mock server', 'Noted', {
        duration: 3000,
      });
    });
  }
}
