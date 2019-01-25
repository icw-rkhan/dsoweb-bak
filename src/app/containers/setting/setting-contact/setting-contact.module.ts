import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';

import { SharedModule } from '../../../shared/shared.module';

import { SettingContactRoutingModule } from './setting-contact.routing';
import { SettingContactComponent } from './setting-contact.component';

@NgModule({
  imports: [
    SharedModule,
    ModalModule.forRoot(),
    SettingContactRoutingModule
  ],
  declarations: [
    SettingContactComponent,
    SettingContactComponent
  ]
})
export class SettingContactModule { }
