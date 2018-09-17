import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { FeedPageComponent } from './feed-page';
import { LatestPageComponent } from './latest-page/latest-page';
import { ArticlesPageComponent } from './articles-page/articles-page';
import { PodcastsPageComponent } from './podcasts-page/podcasts-page';
import { InterviewsPageComponent } from './interviews-page/interviews-page';
import { TechGuidesPageComponent } from './tech-guides-page/tech-guides-page';
import { AnimationsPageComponent } from './animations-page/animations-page';
import { TipSheetsPageComponent } from './tip-sheets-page/tip-sheets-page';
import { VideosPageComponent } from './videos-page/videos-page';
import {AuthGuard} from '../../services/auth/auth-guard';

export const ROUTES: Routes = [
  {
    path: 'feed',
    canActivate: [AuthGuard],
    component: FeedPageComponent,
    children: [
      {
        path: 'latest',
        component: LatestPageComponent,
      },
      {
        path: 'videos',
        component: VideosPageComponent,
      },
      {
        path: 'articles',
        component: ArticlesPageComponent,
      },
      {
        path: 'podcasts',
        component: PodcastsPageComponent,
      },
      {
        path: 'interviews',
        component: InterviewsPageComponent,
      },
      {
        path: 'tech-guides',
        component: TechGuidesPageComponent,
      },
      {
        path: 'animations',
        component: AnimationsPageComponent,
      },
      {
        path: 'tip-sheets',
        component: TipSheetsPageComponent,
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class FeedRoutingModule {
}
