import { Routes } from '@angular/router';
import { DownloadsModule } from './downloads.module';

export const reviewsRoutes: Routes = [
    {
        path: 'downloads',
        loadChildren: () => DownloadsModule
    }
];