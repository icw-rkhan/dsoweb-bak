import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { SearchPageComponent } from './search-page';
import { SearchRoutingModule } from './search-page.routing';

export const COMPONENTS = [
  SearchPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SearchRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})
export class SearchPageModule {
}
