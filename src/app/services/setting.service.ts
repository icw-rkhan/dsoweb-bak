import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    getHeaders(): HttpHeaders {
        const headers = new HttpHeaders()
          .append('Authorization', `Bearer ${this.authService.getToken()}`)
          .append('Content-Type', 'application/json');

        return headers;
    }
}
