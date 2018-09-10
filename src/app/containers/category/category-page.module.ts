import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { CategoryPageComponent } from './category-page';
import { CategoryRoutingModule } from './category-page.routing';

export const COMPONENTS = [
  CategoryPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CategoryRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})
export class CategoryPageModule {
}
