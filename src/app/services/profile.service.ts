import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { forkJoin } from 'rxjs';

import { environment } from '../../environments/environment';
import {post} from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  findOneByEmail(body: any): Observable<any> {
    const url = `${environment.profileApiUrl}/userProfile/findOneByEmail`;
    const headers: any = this.customHeader();
    const formData = this.parseFormData(body);
    return this.http.post(url, formData, { headers: headers }).pipe(
      map(this.extractData)
    );
  }

  getMetaData(): Observable<any> {
    const headers: any = this.customHeader();
    const url1 = `${environment.profileApiUrl}/residencySpecialty/findAllSpecialty`;
    const url2 = `${environment.profileApiUrl}/dentalSchool/getAll`;
    const url3 = `${environment.profileApiUrl}/experience/findAllPracticeRole`;
    const url4 = `${environment.profileApiUrl}/experience/findAllPracticeType`;
    // const url5 = `${environment.profileApiUrl}/experience/findAllPracticeDSO`;
    // const url6 = `${environment.profileApiUrl}/usZipSv/findAllusZipSvByZip`;
    const formData = this.parseFormData({ name: '' });
    // const formData6 = this.parseFormData({ zip: '' });
    return forkJoin(
      this.http.post(url1, {}, { headers: headers }).pipe(
        map(this.extractData)
      ),
      this.http.post(url2, formData, { headers: headers }).pipe(
        map(this.extractData)
      ),
      this.http.post(url3, formData, { headers: headers }).pipe(
        map(this.extractData)
      ),
      this.http.post(url4, formData, { headers: headers }).pipe(
        map(this.extractData)
      ),
      // this.http.post(url5, formData, { headers: headers }).pipe(
      //   map(this.extractData)
      // ),
      // this.http.post(url6, formData6, { headers: headers }).pipe(
      //   map(this.extractData)
      // )
    );
  }

  customHeader() {
    return {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
  }

  parseFormData(data: any) {
    const formData: FormData = new FormData();
    Object.keys(data).map((key: any) => {
      formData.append(key, data[key]);
    });
    return formData;
  }

  saveProfile(profile) {
    const url = `${environment.profileApiUrl}/userProfile/save`;
    const headers = this.customHeader();
    return this.http.post(url, profile, { headers: headers });
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
}
