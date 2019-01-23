import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../services/auth/auth-guard';

import { SettingComponent } from './setting-page';
import { SettingMainComponent } from './setting-main/setting-main.component';
import { SettingAboutComponent } from './setting-about/setting-about.component';
import { SettingSupportComponent } from './setting-support/setting-support.component';
import { SettingPasswordComponent } from './setting-password/setting-password.component';
import { SettingHelpComponent } from './setting-help/setting-help.component';
import { SettingContactComponent } from './setting-contact/setting-contact.component';

const routes: Routes = [
    {
        path: 'setting',
        canActivate: [AuthGuard],
        component: SettingComponent,
        children: [
            {
                path: '',
                component: SettingMainComponent,
            },
            {
                path: 'about',
                component: SettingAboutComponent,
            },
            {
                path: 'support',
                component: SettingSupportComponent,
            },
            {
                path: 'support/help',
                component: SettingHelpComponent,
            },
            {
                path: 'support/contact',
                component: SettingContactComponent,
            },
            {
                path: 'password',
                component: SettingPasswordComponent,
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class SettingRoutingModule { }
