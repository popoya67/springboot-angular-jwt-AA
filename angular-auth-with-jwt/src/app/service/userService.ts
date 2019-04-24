import { Injectable } from '@angular/core';
import { User } from '../dto/user.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   loginUser= new BehaviorSubject<User>(new User());

   public setLoginUser(user:User){
    this.loginUser.next(user);
   }

   public getLoginUser() : Observable<User>{
     return this.loginUser.asObservable();
   }
}