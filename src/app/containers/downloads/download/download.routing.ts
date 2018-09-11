import { Routes } from '@angular/router';
import { DownloadModule } from './download.module';

export const viewRoutes: Routes = [
    {
        path:'download',
        loadChildren: () => DownloadModule
    }
];