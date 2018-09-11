import { Routes } from '@angular/router';
import { ManageModule } from './manage.module';

export const manageRoutes: Routes = [
    {
        path:'manage',
        loadChildren: () => ManageModule
    }
];