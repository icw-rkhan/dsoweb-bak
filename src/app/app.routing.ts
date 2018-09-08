import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/example',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
