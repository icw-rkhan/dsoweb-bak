import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgProgressModule } from '@ngx-progressbar/core';
import { MatDatepickerModule } from '@angular/material';
import { GoTopButtonModule } from 'ng2-go-top-button';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';

import { SettingContactModule } from './containers/setting/setting-contact/setting-contact.module';
import { SettingHelpModule } from './containers/setting/setting-help/setting-help.module';
import { BookmarksPageModule } from './containers/bookmarks/bookmarks-page.module';
import { EditProfileModule } from './containers/edit-profile/edit-profile.module';
import { CategoryPageModule } from './containers/category/category-page.module';
import { EducationModule } from './containers/education/education.module';
import { SearchPageModule } from './containers/search/search-page.module';
import { UnitePageModule } from './containers/unite/unite-page.module';
import { ReviewsModule } from './containers/reviews/reviews.module';
import { ProfileModule } from './containers/profile/profile.module';
import { SettingModule } from './containers/setting/setting.module';
import { DetailModule } from './containers/detail/detail.module';
import { CareerModule } from './containers/career/career.module';
import { EventModule } from './containers/event/event.module';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { FeedModule } from './containers/feed/feed.module';

import { TokenInterceptor } from './services/auth/auth.interceptor';
import { environment } from '../environments/environment';
import { AuthGuard } from './services/auth/auth-guard';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import * as Hammer from 'hammerjs';

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
    LayoutModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DeviceDetectorModule.forRoot(),
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
