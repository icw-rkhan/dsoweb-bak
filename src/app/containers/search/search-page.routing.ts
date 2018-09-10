import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SearchPageComponent } from './search-page';

export const ROUTES: Routes = [
  {
    path: 'search',
    component: SearchPageComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class SearchRoutingModule {
}
