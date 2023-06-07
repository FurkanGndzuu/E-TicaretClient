import { Component ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicLoadComponentDirective } from './directives/dynamic-load-component.directive';
import { AuthService } from './services/common/auth.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective , {static : true})
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;

  constructor(public authService : AuthService ,private router : Router , private serviceLoadComponenet : DynamicLoadComponentService){
    authService.identityCheck();
  }

  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
  }

  loadComponent() {
    this.serviceLoadComponenet.loadComponent(ComponentType.BasketsComponent , this.dynamicLoadComponentDirective.viewContainerRef);
  }
}
