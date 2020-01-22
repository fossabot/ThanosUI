import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MockMappingDTO } from '../models/MockMappingDTO';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class MockServerService {
    constructor(private apiService: ApiService) {

    }

    getMapping(): Observable<MockMappingDTO[]> {
        return this.apiService.get(environment.mockserver_url + '/apis/mappings')
            .pipe(map(res => res));
    }
}
