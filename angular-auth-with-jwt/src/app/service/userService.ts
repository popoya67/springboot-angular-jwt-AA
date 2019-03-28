import { Injectable } from '@angular/core';
import { User } from '../dto/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   loginUser:User = new User();
}