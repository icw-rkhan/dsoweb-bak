import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {NgProgressModule} from '@ngx-progressbar/core';

import {SharedModule} from './shared';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {ReviewsModule} from './containers/reviews/reviews.module';
import {FeedModule} from './containers/feed/feed.module';
import {DetailModule} from './containers/detail/detail.module';
import {SearchPageModule} from './containers/search/search-page.module';
import {CategoryPageModule} from './containers/category/category-page.module';
import {BookmarksPageModule} from './containers/bookmarks/bookmarks-page.module';
import {ProfileModule} from './containers/profile/profile.module';
import {EditProfileModule} from './containers/edit-profile/edit-profile.module';
import {AuthGuard} from './services/auth/auth-guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgProgressModule.forRoot({
      meteor: false,
      color: '#354051'
    }),
    // Module import
    SharedModule,
    ReviewsModule,
    FeedModule,
    DetailModule,
    SearchPageModule,
    CategoryPageModule,
    BookmarksPageModule,
    ProfileModule,
    EditProfileModule,
    AppRoutingModule,
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
