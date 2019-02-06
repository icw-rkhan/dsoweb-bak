import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../services/auth/auth-guard';
import { SettingHelpComponent } from './setting-help.component';
import { SettingHelpMainComponent } from './help-main/help-main.component';
import { SettingHelpListComponent } from './help-list/help-list.component';

const routes: Routes = [
  {
    path: 'settings/support/help',
    canActivate: [AuthGuard],
    component: SettingHelpComponent,
    children: [
        {
            path: '',
            component: SettingHelpMainComponent,
        },
        {
            path: 'list/:moduleType',
            component: SettingHelpListComponent,
        },
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingHelpRoutingModule { }
