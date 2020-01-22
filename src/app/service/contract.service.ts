import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TcpRequestDTO } from '../models/TcpRequestDTO';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TcpResponseDTO } from '../models/TcpResponseDTO';

@Injectable()
export class ContractService {
    constructor(private apiService: ApiService) { }

    postTcpRequest(tcpRequest: TcpRequestDTO): Observable<TcpResponseDTO> {
        return this.apiService
            .post(environment.contractService_url + '/utils/tcp', tcpRequest)
            .pipe(map(res => res));
    }
}
