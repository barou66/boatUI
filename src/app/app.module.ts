import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, forwardRef } from '@angular/core';

import { ApiInterceptor } from './cores/services/api.interceptor';
import { ApiModule } from 'src/api/api.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ApiModule,
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 10000,
      preventDuplicates: true,
    }),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: forwardRef(() => ApiInterceptor),
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
