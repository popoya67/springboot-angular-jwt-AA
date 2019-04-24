import { Component, OnInit } from '@angular/core';
import { UserService } from './service/userService';
import { JwtService } from './service/jwtService';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-auth-token-app';

  constructor(
    private userService : UserService
    ,private jwtService : JwtService
    ,private _http: HttpClient
  ){

  }
  ngOnInit() {
   let accessToken = localStorage.getItem("ACCESS_TOKEN");
   let refreshToken = localStorage.getItem("REFRESH_TOKEN");

   //accessToken만 만료되었을 때
   if(this.jwtService.isTokenExpired(accessToken) && !this.jwtService.isTokenExpired(refreshToken)){
    this._http.post("http://localhost:8080/refreshAccessToken", refreshToken).pipe(
      tap((res:any) => {
        localStorage.setItem("ACCESS_TOKEN", res.data.accessToken);
        if(res.data.refreshToken){
          localStorage.setItem("REFRESH_TOKEN", res.data.refreshToken);
        }
        this.userService.setLoginUser(this.jwtService.decodeToUser(accessToken));
      })
      ).subscribe();
   }

   //accessToken, refreshToken 모두 만료되면
   else if(this.jwtService.isTokenExpired(accessToken) && this.jwtService.isTokenExpired(refreshToken)){
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
   }

   else if(accessToken){
    this.userService.setLoginUser(this.jwtService.decodeToUser(accessToken));
   }
  }
}
