import { OnInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient} from '@angular/common/http';
import { tap} from 'rxjs/operators';
import { UserService } from "../service/userService";
import { User } from "../dto/user.model";
import { Observable } from "rxjs";

@Component({
    selector: 'app-login',
    templateUrl: './main.component.html'
  })
  export class MainComponent implements OnInit {
    loginUser : Observable<User>;
    constructor(
        private router : Router,
        private _http: HttpClient,
        private userService: UserService) {
    }
    ngOnInit(): void {
       this.loginUser = this.userService.loginUser;
    }

    logout(){
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        this.router.navigate(['login']);
    }

    getPrivateInfo(){
        this._http.get("http://localhost:8080/getPrivateInfo").pipe(
        tap((res :any) => {
            alert(res.data);
        })

        ).subscribe();
    }
  }