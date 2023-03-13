import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/baseComponent';
import { TokenResponse } from 'src/app/contracts/Token/tokenResponse';
import { _isAuthanticated } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtHelperService : JwtHelperService , private router : Router , private toastrService : CustomToastrService,
    private spinner : NgxSpinnerService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.spinner.show(SpinnerType.BallAtom);


       if(!_isAuthanticated){

        this.router.navigate(["login"] , { queryParams : {returnUrl : state.url}});

        this.toastrService.message("The Firstly You Should Login Your Account" , "Login" , {
          messageType : ToastrMessageType.Warning,
          position : ToastrPosition.TopRight
        });

       }

       this.spinner.hide(SpinnerType.BallAtom);




    return true;
  }
  
}
