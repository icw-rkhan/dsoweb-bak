import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';

export interface IAppConfig {
  apiUrl: string;
}

@Injectable({providedIn: 'root'})
export class AppConfig implements IAppConfig {

  production: boolean;
  apiUrl: string;

  constructor() {
    Object.assign(this, environment);
  }
}
