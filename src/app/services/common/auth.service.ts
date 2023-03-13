import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelperService : JwtHelperService) { }


  identityCheck(){
    
    const token : string = localStorage.getItem("accessToken");

    let expired : boolean;

    try {

     expired = this.jwtHelperService.isTokenExpired(token);
     
    } catch {

     expired = true;

    }

    _isAuthanticated = token != null && !expired;
  }

  get isAuthanticated(){
    return _isAuthanticated;
  }
}

export let _isAuthanticated : boolean;
