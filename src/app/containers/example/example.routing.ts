import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ExamplePageComponent } from './example-page';

export const ROUTES: Routes = [
  {
    path: 'example',
    component: ExamplePageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class ExampleRoutingModule {
}
