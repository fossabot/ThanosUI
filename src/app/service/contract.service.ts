import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TcpRequestDTO } from '../models/mockmapping/TcpRequestDTO';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TcpResponseDTO } from '../models/mockmapping/TcpResponseDTO';
import { Schema } from '../models/schema/Schema';

@Injectable()
export class ContractService {
    constructor(private apiService: ApiService) { }

    postTcpRequest(tcpRequest: TcpRequestDTO): Observable<TcpResponseDTO> {
        return this.apiService
            .post(environment.contractService_url + '/utils/tcp', tcpRequest)
            .pipe(map(res => res));
    }

    getAllSchemas(): Observable<Schema[]> {
        return this.apiService
            .get(environment.contractService_url + '/schemas')
            .pipe(map(res => res));
    }

    getSchemaDetailByKey(provider: string, name: string, version: string): Observable<Schema> {
        return this.apiService.get(environment.contractService_url +
            '/schemas/index?name=' + name + '&provider=' + provider + '&version=' + version);
    }

}
