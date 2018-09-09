import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { FeedRoutingModule } from './feed.routing';
import { FeedPageComponent } from './feed-page';
import { LatestPageComponent } from './latest-page/latest-page';
import { ArticlesPageComponent } from './articles-page/articles-page';
import { PodcastsPageComponent } from './podcasts-page/podcasts-page';
import { InterviewsPageComponent } from './interviews-page/interviews-page';
import { TechGuidesPageComponent } from './tech-guides-page/tech-guides-page';
import { AnimationsPageComponent } from './animations-page/animations-page';
import { TipSheetsPageComponent } from './tip-sheets-page/tip-sheets-page';
import { VideosPageComponent } from './videos-page/videos-page';

export const COMPONENTS = [
  FeedPageComponent,
  LatestPageComponent,
  VideosPageComponent,
  ArticlesPageComponent,
  PodcastsPageComponent,
  InterviewsPageComponent,
  TechGuidesPageComponent,
  AnimationsPageComponent,
  TipSheetsPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FeedRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})
export class FeedModule {
}
