import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TcpRequestDTO } from '../models/mockmapping/TcpRequestDTO';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TcpResponseDTO } from '../models/mockmapping/TcpResponseDTO';
import { SchemaDetail } from '../models/schema/SchemaDetail';
import { SchemaKey } from '../models/schema/SchemaKey';

@Injectable()
export class ContractService {
    constructor(private apiService: ApiService) { }

    postTcpRequest(tcpRequest: TcpRequestDTO): Observable<TcpResponseDTO> {
        return this.apiService
            .post(environment.contractService_url + '/utils/tcp', tcpRequest)
            .pipe(map(res => res));
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

}
