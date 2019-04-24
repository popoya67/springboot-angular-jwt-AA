import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { JwtService } from "./jwtService";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { UserService } from "./userService";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(
      private router: Router
      ,private jwtService: JwtService
    ) {}
    canActivate(): boolean {
        let accessToken = localStorage.getItem("ACCESS_TOKEN");
        let refreshToken = localStorage.getItem("REFRESH_TOKEN");
        if(!accessToken || !refreshToken || (this.jwtService.isTokenExpired(accessToken) && this.jwtService.isTokenExpired(refreshToken))){
          this.router.navigate(['login']);
          return false;
        }

        return true;
      }
  }