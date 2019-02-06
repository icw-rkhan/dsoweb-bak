import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../../services/auth/auth-guard';

import { SettingContactComponent } from './setting-contact.component';

const routes: Routes = [
    {
        path: 'settings/support/contact',
        canActivate: [AuthGuard],
        component: SettingContactComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class SettingContactRoutingModule { }
