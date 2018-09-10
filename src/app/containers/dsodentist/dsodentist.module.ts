import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DsodentistPageComponent } from './dsodentist';
import { SharedModule } from '../../shared';
import { DsodentistRoutingModule } from './dsodentist.routing';
import { ComponentAvatarComponent } from './component-avatar/component-avatar.component';


export const COMPONENTS = [
  ComponentAvatarComponent,

];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DsodentistRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
    DsodentistPageComponent
  ],
})
export class DsodentistModule {
}
