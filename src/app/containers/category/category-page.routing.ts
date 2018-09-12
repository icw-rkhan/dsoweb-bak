import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CategoryPageComponent } from './category-page';

export const ROUTES: Routes = [
  {
    path: 'category',
    component: CategoryPageComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class CategoryRoutingModule {
}
