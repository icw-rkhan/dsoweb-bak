import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Example, ExampleParams } from '../models/example.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor(private http: HttpClient) {
  }

  example(params: ExampleParams): Observable<Example> {
    const url = `${environment.cmsApiUrl}/example`;
    const httpParams = new HttpParams()
      .set('asset', params.id.toString());
    return this.http.get<Example>(url, {
      params: httpParams,
    });
  }

}
