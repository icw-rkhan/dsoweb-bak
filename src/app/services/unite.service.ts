import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { Unite } from '../models/unite.model';

@Injectable({
  providedIn: 'root'
})
export class UniteService {

    unites: Unite[];

    constructor() {
        this.unites = [];
    }

    makeTestDate() {
        this.unites = [];

        const unite = new Unite();
        unite.id = '1';
        unite.thumbnail = 'assets/images/unite/cover-page.png';
        unite.date = 'August/September 2018';
        unite.details = 'Vol 1 Issue 1';
        unite.isDownload = false;

        const unite2 = new Unite();
        unite2.id = '2';
        unite2.thumbnail = 'assets/images/unite/cover-page.png';
        unite2.date = 'Jun/July 2018';
        unite2.details = 'Vol 1 Issue 1';
        unite2.isDownload = true;

        const unite3 = new Unite();
        unite3.id = '3';
        unite3.thumbnail = 'assets/images/unite/cover-page.png';
        unite3.date = 'April/May 2018';
        unite3.details = 'Vol 1 Issue 1';
        unite3.isDownload = false;

        const unite4 = new Unite();
        unite4.id = '4';
        unite4.thumbnail = 'assets/images/unite/cover-page.png';
        unite4.date = 'Jun/July 2018';
        unite4.details = 'Vol 1 Issue 1';
        unite4.isDownload = true;

        this.unites.push(unite);
        this.unites.push(unite2);
        this.unites.push(unite3);
        this.unites.push(unite4);

        return this.unites;
    }

    getUniteById(id: string) {
        this.makeTestDate();

        return this.unites.find(item => item.id === id);
    }
}
