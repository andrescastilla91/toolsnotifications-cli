import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RequestInterceptor } from "./request.interceptor.service";
import { ResponseInterceptor } from "./response.interceptor.service";


@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
  ]
})

export class InterceptorModule {}