import { NgModule , CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogModule } from './dialogs/dialog/dialog.module';
import { JwtModule } from '@auth0/angular-jwt';
import { SocialLoginModule , GoogleLoginProvider , SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { LoginComponent } from './ui/components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    MatDialogModule,
   DialogModule,
   SocialLoginModule,
   JwtModule.forRoot({
    config : {
      tokenGetter : () => localStorage.getItem("accessToken"),
      allowedDomains : ["localhost:7272"]
    }
   }),
   
    
  ],
  providers: [
    {provide : "baseUrl" , useValue : "https://localhost:7272/api"},
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("624691356891-p4foii4vjhpksl76vk71q8ccah6r74al.apps.googleusercontent.com")
          }
        ],
        onError: err => console.log(err)
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
