import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared';
import { FeaturesComponent } from './features.component';

import { profileRoutes } from './profile/profile.routing';


const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
     ...profileRoutes
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FeaturesComponent
  ],
})
export class FeaturesModule { }
