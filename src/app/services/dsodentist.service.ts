import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Dsodentist, DsodentistParams } from '../models/dsodentist.model';

@Injectable({
  providedIn: 'root'
})
export class DsodentistService {

  constructor(private http: HttpClient) {
  }

  dsodentist(params: DsodentistParams): Observable<Dsodentist> {
    const url = `@api/dsodentist`;
    const httpParams = new HttpParams()
      .set('asset', params.id.toString());
    return this.http.get<Dsodentist>(url, {
      params: httpParams,
    });
  }

}
