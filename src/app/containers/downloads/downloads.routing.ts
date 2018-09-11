import { Routes } from '@angular/router';
import { DownloadsModule } from './downloads.module';

export const downloadsRoutes: Routes = [
    {
        path: 'downloads',
        loadChildren: () => DownloadsModule
    }
];