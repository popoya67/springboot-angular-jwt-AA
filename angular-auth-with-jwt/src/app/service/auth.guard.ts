import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { JwtService } from "./jwtService";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(
      private router: Router,
      private jwtService: JwtService
    ) {}
    canActivate(): boolean {
        let token = localStorage.getItem("AUTH_TOKEN");
        if (!token || this.jwtService.isTokenExpired(token)) {
          this.router.navigate(['login']);
          return false;
        }
        return true;
      }
  }