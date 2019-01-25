import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';

import { SharedModule } from '../../shared/shared.module';

import { SettingRoutingModule } from './setting.routing';
import { SettingComponent } from './setting-page';
import { SettingMainComponent } from './setting-main/setting-main.component';
import { SettingAboutComponent } from './setting-about/setting-about.component';
import { SettingSupportComponent } from './setting-support/setting-support.component';
import { SettingPasswordComponent } from './setting-password/setting-password.component';
import { SettingHelpComponent } from './setting-help/setting-help.component';

@NgModule({
  imports: [
    SharedModule,
    ModalModule.forRoot(),
    SettingRoutingModule
  ],
  declarations: [
    SettingComponent,
    SettingMainComponent,
    SettingAboutComponent,
    SettingSupportComponent,
    SettingPasswordComponent,
    SettingHelpComponent
  ]
})
export class SettingModule { }
