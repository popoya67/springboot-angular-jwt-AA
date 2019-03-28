import { Component, OnInit } from '@angular/core';
import { UserService } from './service/userService';
import { JwtService } from './service/jwtService';

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
  ){

  }
  ngOnInit() {
   let token = localStorage.getItem("AUTH_TOKEN");
   if(token){
    this.userService.loginUser = this.jwtService.decodeToUser(token);
   }
  }
}
