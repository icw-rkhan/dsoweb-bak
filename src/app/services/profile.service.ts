import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  findOneByEmail(body: any): Observable<any> {
    const url = `${environment.profileApiUrl}/userProfile/findOneByEmail`;
    const headers: any = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    const formData: FormData = new FormData();
    Object.keys(body).map((key: any) => {
      formData.append(key, body[key]);
    });
    return this.http.post(url, formData, { headers: headers }).pipe(
      map(this.extractData)
    );
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
}
