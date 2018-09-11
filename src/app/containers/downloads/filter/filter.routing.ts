import { Routes } from '@angular/router';
import { FilterModule } from './filter.module';

export const filterRoutes: Routes = [
    {
        path:'filter',
        loadChildren: () => FilterModule
    }
];