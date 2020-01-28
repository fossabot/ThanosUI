import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TcpRequestDTO } from '../models/mockmapping/TcpRequestDTO';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TcpResponseDTO } from '../models/mockmapping/TcpResponseDTO';
import { SchemaDetail } from '../models/schema/SchemaDetail';
import { SchemaKey } from '../models/schema/SchemaKey';
import { ContractDetailImpl } from '../models/contract/ContractDetailImpl';

@Injectable()
export class ContractService {
    constructor(private apiService: ApiService) { }

    postTcpRequest(tcpRequest: TcpRequestDTO): Observable<TcpResponseDTO> {
        return this.apiService
            .post(environment.contractService_url + '/utils/tcp', tcpRequest);
    }

    getAllSchemaKeys(): Observable<SchemaKey[]> {
        return this.apiService
            .get(environment.contractService_url + '/schemas/keys/');
    }

    getSchemaDetailByKey(provider: string, name: string, version: string): Observable<SchemaDetail> {
        return this.apiService.get(environment.contractService_url +
            '/schemas/index?name=' + name + '&provider=' + provider + '&version=' + version);
    }

    getSchemaDetailById(id: string): Observable<SchemaDetail> {
        return this.apiService.get(environment.contractService_url + '/schemas/id/' + id);
    }

    updateSchemaDetail(schemaDetail: SchemaDetail): Observable<SchemaDetail> {
        return this.apiService.put(environment.contractService_url + '/schemas', schemaDetail);
    }

    addSchemaDetail(schemaDetail: SchemaDetail): Observable<SchemaDetail> {
        return this.apiService.post(environment.contractService_url + '/schemas', schemaDetail);
    }

    deleteSchema(id: string): Observable<any> {
        console.log('going to delete ' + id);
        return this.apiService.delete(environment.contractService_url +
            '/schemas/id/' + id);
    }

    addContract(contractDetailImpl: ContractDetailImpl): Observable<any> {
        return this.apiService.post(environment.contractService_url +
            '/contracts', contractDetailImpl);
    }

    getAllContracts(): Observable<ContractDetailImpl[]> {
        return this.apiService.get(environment.contractService_url + '/contracts');
    }

    getContractsBySchemaId(schemaId: string): Observable<ContractDetailImpl[]> {
        return this.apiService.get(environment.contractService_url +
            '/contracts/schemaId/' + schemaId);
    }

    getContractById(id: string): Observable<ContractDetailImpl> {
        return this.apiService.get(environment.contractService_url +
            '/contracts/id/' + id);
    }
}
