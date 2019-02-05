import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';

import { SharedModule } from '../../../shared/shared.module';
import { SettingHelpRoutingModule } from './setting-help.routing';
import { SettingHelpComponent } from './setting-help.component';
import { SettingHelpMainComponent } from './help-main/help-main.component';
import { SettingHelpListComponent } from './help-list/help-list.component';

@NgModule({
  imports: [
    SharedModule,
    ModalModule.forRoot(),
    SettingHelpRoutingModule
  ],
  declarations: [
    SettingHelpComponent,
    SettingHelpMainComponent,
    SettingHelpListComponent
  ]
})
export class SettingHelpModule { }
