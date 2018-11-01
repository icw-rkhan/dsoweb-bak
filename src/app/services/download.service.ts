import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../../environments/environment';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
  }

  getFileDownloadByObjectId(objectId) {
    const url = `${environment.cmsAPIUrl}/file/downloadFileByObjectId`;

    const headers = this.getHeaders();

    return this.http.get(url, {headers, params: {'objectId': objectId}});
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.authService.getToken()}`);

    return headers;
  }
}
