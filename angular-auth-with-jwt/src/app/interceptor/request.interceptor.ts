import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, catchError} from 'rxjs/operators';
import { User } from '../dto/user.model';
import { Router } from '@angular/router';
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private user: User;
  constructor(private router : Router){

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestHeaders = request.headers;
    requestHeaders = requestHeaders.append('Content-Type', 'application/json');
    if (localStorage.getItem('AUTH_TOKEN')) {
      requestHeaders = requestHeaders.append('AUTH_TOKEN', localStorage.getItem('AUTH_TOKEN'));
    }

    const modified = request.clone({ headers: requestHeaders });
    return next.handle(modified).pipe(
      tap(
        (resp: HttpEvent<any>) => {
          if (resp instanceof HttpResponse && resp.headers && resp.headers.get('AUTH_TOKEN')) {
            localStorage.setItem('AUTH_TOKEN', resp.headers.get('AUTH_TOKEN'));
          }
        }
      ),
      catchError(errRsp => {
        if (errRsp instanceof HttpErrorResponse) { 
            console.log(errRsp.status);
            if(errRsp.status == 401){
              if(confirm(errRsp.error.message)){
                localStorage.removeItem('AUTH_TOKEN');
                this.router.navigate(['login']);
              }
            }else{
              alert(errRsp.error.message);
            }
        }
        return EMPTY;
      })
    );
  }
}
