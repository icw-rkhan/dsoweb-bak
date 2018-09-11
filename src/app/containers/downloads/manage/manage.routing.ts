import { Routes } from '@angular/router';
import { ManageModule } from './manage.module';

export const viewRoutes: Routes = [
    {
        path:'manage',
        loadChildren: () => ManageModule
    }
];