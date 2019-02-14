import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import * as _ from 'lodash';

import { AuthService } from './auth/auth.service';
import { Topic } from '../models/topic.model';
import { Term } from '../models/term.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

    constructor(
        private http: HttpClient,
        private authService: AuthService) {

    }

    topic(id: string): Observable<Topic> {
        const url = `${environment.settingApiUrl}/faqs/${id}`;

        const headers = this.getHeaders();

        return this.http.get(url, {headers}).pipe(map((response: any) =>
            new Topic().deserialize(response.resultMap)
        ));
    }

    getTopics(body: any): Observable<Topic[]> {
        const url = `${environment.settingApiUrl}/faqs/list`;

        const headers = this.getHeaders();

        return this.http.post(url, body, {headers}).pipe(map((response: any) =>
        response.resultMap.list.map(topic => new Topic().deserialize(topic))));
    }

    getTerms(body: any): Observable<Term[]> {
        const url = `${environment.settingApiUrl}/terms/list`;

        const headers = this.getHeaders();

        return this.http.post(url, body, {headers}).pipe(map((response: any) =>
        response.resultMap.list.map(term => new Term().deserialize(term))));
    }

    contact(body: any): Observable<any> {
        const url = `${environment.settingApiUrl}/feedback`;

        const headers = this.getHeaders();

        return this.http.post(url, body, {headers});
    }

    uploadFile(file) {
        const url = `${environment.settingApiUrl}/file/uploadFile`;

        const form = new FormData();
        form.append('file', file);

        return this.http.request(new HttpRequest('POST', url, form, {
            reportProgress: true
          }));
    }

    getHeaders(): HttpHeaders {
        const headers = new HttpHeaders()
          .append('Authorization', `Bearer ${this.authService.getToken()}`)
          .append('Content-Type', 'application/json');

        return headers;
    }
}
