import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgProgressModule } from '@ngx-progressbar/core';
import { MatDatepickerModule } from '@angular/material';
import { GoTopButtonModule } from 'ng2-go-top-button';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ReviewsModule } from './containers/reviews/reviews.module';
import { FeedModule } from './containers/feed/feed.module';
import { DetailModule } from './containers/detail/detail.module';
import { SearchPageModule } from './containers/search/search-page.module';
import { CategoryPageModule } from './containers/category/category-page.module';
import { BookmarksPageModule } from './containers/bookmarks/bookmarks-page.module';
import { ProfileModule } from './containers/profile/profile.module';
import { EditProfileModule } from './containers/edit-profile/edit-profile.module';
import { UnitePageModule } from './containers/unite/unite-page.module';
import { CareerModule } from './containers/career/career.module';
import { EducationModule } from './containers/education/education.module';
import { EventModule } from './containers/event/event.module';
import { SettingModule } from './containers/setting/setting.module';
import { SettingContactModule } from './containers/setting/setting-contact/setting-contact.module';
import { SettingHelpModule } from './containers/setting/setting-help/setting-help.module';

import { AuthGuard } from './services/auth/auth-guard';
import { environment } from '../environments/environment';
import { TokenInterceptor } from './services/auth/auth.interceptor';

import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

export class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { direction: Hammer.DIRECTION_ALL}
  };
}

@NgModule({
  declarations: [
    AppComponent,
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCVNk-yni0M9-jJxH9CPxuhupke3y8bPTE',
      libraries: ['places']
    }),
    // Module import
    ReviewsModule,
    FeedModule,
    DetailModule,
    SearchPageModule,
    CategoryPageModule,
    BookmarksPageModule,
    ProfileModule,
    EditProfileModule,
    UnitePageModule,
    CareerModule,
    EducationModule,
    EventModule,
    SettingModule,
    SettingContactModule,
    SettingHelpModule,
    AppRoutingModule,
    MatDatepickerModule,
    GoTopButtonModule
  ],
  providers: [
    AuthGuard,
    // Inject apiKey and, optionally, authorize to integrate with LinkedIN official API
    {provide: 'apiKey', useValue: environment.linkedinClientId},
    {provide: 'authorize', useValue: 'true'}, // OPTIONAL by default: false
    {provide: 'isServer', useValue: 'true'},  // OPTIONAL by default: false
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [MatDatepickerModule],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
