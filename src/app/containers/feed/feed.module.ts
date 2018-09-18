import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { FeedRoutingModule } from './feed.routing';
import { FeedPageComponent } from './feed-page';
import { LatestPageComponent } from './latest-page/latest-page';
import { PostTypePageComponent } from './post-type-page/post-type-page';

export const COMPONENTS = [
  FeedPageComponent,
  LatestPageComponent,
  PostTypePageComponent
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
