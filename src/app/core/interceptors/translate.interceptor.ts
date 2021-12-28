import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class TranslateInterceptor implements HttpInterceptor {
  constructor(private loadService:LoaderService){

  }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.loadService.isLoading.next(true)
    const lang= localStorage.getItem('lang') || 'en';
    request = request.clone({
      setHeaders : {
        'Accept-Language': lang
      }
    })

    return next.handle(request).pipe(
      finalize(
        () => {
          setTimeout(() => {
            this.loadService.isLoading.next(false)
          },600)
        }
      )
    );
  }
}
