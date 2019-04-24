import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, catchError, map, switchMap, flatMap} from 'rxjs/operators';
import { User } from '../dto/user.model';
import { Router } from '@angular/router';
import { JwtService } from '../service/jwtService';
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private user: User;
  refreshTokenUrl = "http://localhost:8080/refreshAccessToken";
  constructor(private router : Router,
              private jwtService : JwtService){

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.processResponse(this.makeRequest(request), next);
  }

  makeRequest(request: HttpRequest<any>) : HttpRequest<any>{
  
    let accessToken = localStorage.getItem('ACCESS_TOKEN');
    let refreshToken = localStorage.getItem('REFRESH_TOKEN');

    let requestHeaders = request.headers;
    requestHeaders = requestHeaders.append('Content-Type', 'application/json');
    if(accessToken){
      //accessToken이 만료되었으면, 재발급 요청하는 로직
      if(request.url!=this.refreshTokenUrl && this.jwtService.isTokenExpired(accessToken)){
        requestHeaders = requestHeaders.append('REFRESH_TOKEN', refreshToken);
      }else{
        requestHeaders = requestHeaders.append('ACCESS_TOKEN', accessToken);
      }
    }
    return request.clone({ headers: requestHeaders });
  }

  processResponse(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
    return next.handle(request).pipe(
      tap(
        (resp: HttpEvent<any>) => {
          if (resp instanceof HttpResponse && resp.headers){

            if( resp.headers.get('ACCESS_TOKEN')) {
              localStorage.setItem('ACCESS_TOKEN', resp.headers.get('ACCESS_TOKEN'));
            }
            if( resp.headers.get('REFRESH_TOKEN')) {
              localStorage.setItem('REFRESH_TOKEN', resp.headers.get('REFRESH_TOKEN'));
            }
          }
        }
      ),
      catchError(errRsp => {
        if (errRsp instanceof HttpErrorResponse) { 
            console.log(errRsp.status);
            if(errRsp.status == 401){
              if(confirm(errRsp.error.message)){
                localStorage.removeItem('ACCESS_TOKEN');
                localStorage.removeItem('REFRESH_TOKEN');
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
