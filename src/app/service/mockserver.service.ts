import { Observable } from 'rxjs';
import { MockMapping } from '../models/MockMapping';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class MockServerService {
    constructor(private apiService: ApiService) {

    }

    getMapping(): Observable<MockMapping[]> {
        return this.apiService.get(environment.mockserver_url + '/apis/mappings');
    }
}
