import { Routes } from '@angular/router';
import { DownloadModule } from './download.module';

export const downloadRoutes: Routes = [
    {
        path:'download',
        loadChildren: () => DownloadModule
    }
];