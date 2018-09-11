import { Routes } from '@angular/router';
import { ViewModule } from './view.module';

export const viewRoutes: Routes = [
    {
        path:'view',
        loadChildren: () => ViewModule
    }
];