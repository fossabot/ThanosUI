import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MockMappingDTO } from '../models/mockmapping/MockMappingDTO';
import { ContractDetailImpl } from '../models/contract/ContractDetailImpl';
import { SchemaDetailImpl } from '../models/schema/SchemaDetailImpl';
import { ContractKeyImpl } from '../models/contract/ContractKeyImpl';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class MockServerService {
    constructor(private apiService: ApiService) {
    }

    getMapping(): Observable<MockMappingDTO[]> {
        return this.apiService.get(environment.mockserver_url + '/apis/mappings');
    }

    notifyContractAddOrUpdate(contractDetailImpl: ContractDetailImpl): Observable<any> {
        return this.apiService.post(environment.mockserver_url + '/apis/contracts', contractDetailImpl);
    }

    notifyContractRemove(contractKey: ContractKeyImpl): Observable<any> {
        return this.apiService.post(environment.mockserver_url + '/apis/remove/contracts', contractKey);
    }

    notifySchemaAddOrUpdate(schemaDetailImpl: SchemaDetailImpl): Observable<any> {
        return this.apiService.post(environment.mockserver_url + '/apis/schemas', schemaDetailImpl);
    }

    buildReq(contractKey: ContractKeyImpl): Observable<string> {
        const params = new HttpParams()
            .set('consumer', contractKey.consumer)
            .set('provider', contractKey.provider)
            .set('contractName', contractKey.name)
            .set('contractVersion', contractKey.version);
        return this.apiService.get(environment.mockserver_url + '/apis/utils/build-req', params);
    }
}
