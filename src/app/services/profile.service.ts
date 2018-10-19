import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { forkJoin } from 'rxjs';

import { DentalSchool } from '../models/dental-school.model';

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
    const headers: any = this.customHeader();
    const formData = this.parseFormData(body);
    return this.http.post(url, formData, { headers: headers }).pipe(
      map(this.extractData)
    );
  }

  getListState(): Observable<any> {
    const url = `${environment.profileApiUrl}/usZipSv/findAllStateByState`;
    const headers: any = this.customHeader();
    return this.http.post(url, this.parseFormData({state: ''}), { headers: headers });
  }

  getMetaData(specialty): Observable<any> {
    const headers: any = this.customHeader();
    console.log(headers);

    const url1 = `${environment.profileApiUrl}/residencySpecialty/findAllSpecialty`;
    const url2 = `${environment.profileApiUrl}/dentalSchool/getAll`;
    const url3 = `${environment.profileApiUrl}/experience/findAllPracticeRole`;
    const url4 = `${environment.profileApiUrl}/experience/findAllPracticeType`;
    const url5 = `${environment.profileApiUrl}/experience/findAllPracticeDSO`;
    const url6 = `${environment.profileApiUrl}/residencySpecialty/findAllResidency`;

    const formData = this.parseFormData({ name: '' });

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
      this.http.post(url5, formData, { headers: headers }).pipe(
        map(this.extractData)
      ),
      this.http.post(url6, formData, { headers: headers }).pipe(
        map(this.extractData)
      ),
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
      console.log(data[key]);
      formData.append(key, data[key]);
    });
    return formData;
  }

  saveProfile(profile) {
    const url = `${environment.profileApiUrl}/userProfile/save`;
    const headers = this.customHeader();
    return this.http.post(url, profile, { headers: headers });
  }

  uploadResume(f) {
    const url = `${environment.profileApiUrl}/resumeUpload`;
    const form = new FormData();
    form.append('file', f);
    return this.http.request(new HttpRequest(
      'POST',
      url,
      form,
      {
        reportProgress: true
      }
    ));
  }

  deleteDocumentLibraryByEmail(email) {
    const url = `${environment.profileApiUrl}/documentLibrary/deleteDocumentLibraryByEmail`;
    const headers = this.customHeader();
    return this.http.post(url, { email }, { headers: headers });
  }

  uploadAvatar(f) {
    const url = `${environment.profileApiUrl}/photoUpload`;

    const form = new FormData();
    form.append('file', f);

    const headers = this.customHeader();
    return this.http.post(url, form, { headers: headers });
  }

  dentalSchoolByAlias(alias) {
    const url = `${environment.profileApiUrl}/dentalSchool/getAllSchoolByAlias`;

    const form = new FormData();
    form.append('alias', alias);

    const headers = this.customHeader();
    return this.http.post(url, form, { headers: headers}).pipe(
      map((response: any) => response.resultMap.data.map(post => new DentalSchool().deserialize(post)))
    );
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
}
