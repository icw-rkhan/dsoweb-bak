import { Routes } from '@angular/router';
import { AddModule } from './add.module';

export const addRoutes: Routes = [
    {
        path:'add',
        loadChildren: () => AddModule
    }
];