import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserInterceptorService } from './auth/user-interceptor.service';


@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptorService,
      multi: true,
    }
  ]
})
export class CoreModule { }
