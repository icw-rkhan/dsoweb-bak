import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgProgressModule } from '@ngx-progressbar/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { LayoutModule } from '@angular/cdk/layout';

import { SharedModule } from './shared';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ApiInterceptor } from './interceptors/api.interceptor';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    LayoutModule,
    // Module import
    SharedModule,
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
