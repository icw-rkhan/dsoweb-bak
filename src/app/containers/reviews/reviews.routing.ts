import { Routes } from '@angular/router';
import { ReviewsModule } from './reviews.module';

export const reviewsRoutes: Routes = [
    {
        path: 'reviews',
        loadChildren: () => ReviewsModule
    }
];