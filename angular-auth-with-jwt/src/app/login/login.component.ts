import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { tap} from 'rxjs/operators';
import { User } from '../dto/user.model';
import { Router } from '@angular/router';
import { JwtService } from '../service/jwtService';
import { UserService } from '../service/userService';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private _http: HttpClient
    , private router : Router
    , private jwtService : JwtService
    , private userService : UserService) {
  }
  ngOnInit() {
  }

  login(userId, password){
    const user:User = new User();
    user.userId=userId;
    user.password=password;

    this._http.post("http://localhost:8080/issueToken", user).pipe(
      tap((res :any) => {
        localStorage.setItem("ACCESS_TOKEN", res.data.accessToken);
        localStorage.setItem("REFRESH_TOKEN", res.data.refreshToken);
        this.userService.setLoginUser(this.jwtService.decodeToUser(res.data.accessToken));
      })

    ).subscribe(res =>{
      this.router.navigate(['main']);
    });

  }

}
