import { Routes } from '@angular/router';

export const featuresRoutes: Routes = [
  {
    path: 'features',
    loadChildren: 'src/app/containers/features/features.module#FeaturesModule'
  }
];
