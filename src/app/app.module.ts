import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgProgressModule } from '@ngx-progressbar/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from './shared';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { DsodentistModule } from './containers/dsodentist/dsodentist.module';
import { AddReviewComponent } from './containers/add-review/add-review.component';

@NgModule({
  declarations: [
    AppComponent,
    AddReviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    FlexLayoutModule,
    // Module import
    SharedModule,
    DsodentistModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
