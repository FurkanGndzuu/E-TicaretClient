import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';

  constructor(public authService : AuthService ,private router : Router){
    authService.identityCheck();
  }

  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
  }
}
