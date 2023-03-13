import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { baseComponent, SpinnerType } from 'src/app/base/baseComponent';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends baseComponent {

constructor(private userService : UserService , spinner : NgxSpinnerService, private authService : AuthService,
  private activatedRoute : ActivatedRoute , private router : Router, public socialService : SocialAuthService){
  super(spinner);
  this.socialService.authState.subscribe((user : SocialUser) => {
    console.log(user);

    this.userService.googleLogin(user , () => {
      this.authService.identityCheck();
    });
    
  });

}

async login(usernameOrEmail : string , password : string){
this.showSpinner(SpinnerType.BallAtom);
  this.userService.loginUser(usernameOrEmail , password , () => {
    this.authService.identityCheck();

    this.activatedRoute.queryParams.subscribe(response => {
      let returnUrl = response["returnUrl"];
      if(returnUrl)
      this.router.navigate([returnUrl]);

    })

    this.hideSpinner(SpinnerType.BallAtom)
  });

}



}
