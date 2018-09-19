import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { FeedRoutingModule } from './feed.routing';
import { FeedPageComponent } from './feed-page';
import { PostsPageComponent } from './posts-page/posts-page';

export const COMPONENTS = [
  FeedPageComponent,
  PostsPageComponent
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
