import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { User } from '../dto/user.model';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
    decodeToUser(token: string) : User {
        let jwtHelper: JwtHelperService = new JwtHelperService();
        let decodedToken = jwtHelper.decodeToken(token);
        return decodedToken.user;
    }
    
    isTokenExpired(token: string){
        let jwtHelper: JwtHelperService = new JwtHelperService()
        return jwtHelper.isTokenExpired(token);
        // Other functions
        //const expirationDate = helper.getTokenExpirationDate(token);
    }
    
}