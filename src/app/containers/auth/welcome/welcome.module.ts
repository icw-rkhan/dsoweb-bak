import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared';
import { WelcomeComponent } from './welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    WelcomeComponent
  ],
})
export class WelcomeModule { }
