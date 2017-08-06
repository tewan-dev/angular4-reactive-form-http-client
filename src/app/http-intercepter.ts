import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import  'rxjs/add/operator/do';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const dupReq = req.clone();
    // const secureReq = req.clone({ url: req.url.replace('http://', 'https://') });
    // req = req.clone({ headers: req.headers.set('Authorization', 'authHeader 0123456789') });

    const started = Date.now();

    return next.handle(req).do(event => {

      if (event instanceof HttpResponse) {
        const elapsed = Date.now() - started;
        console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
      }
    });
  }
}
