import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/User';
import { HttpClientService } from './http-client.service';
import  {firstValueFrom, Observable} from 'rxjs'
import { LoginUserModel } from 'src/app/contracts/users/loginUserModel';
import { Token } from 'src/app/contracts/Token/token';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { MessageType } from '../admin/alertify.service';
import { TokenResponse } from 'src/app/contracts/Token/tokenResponse';
import { SocialUser } from 'angularx-social-login';
import { getAllUser } from 'src/app/contracts/users/getAllUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService , private toastrService : CustomToastrService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    }, user);

    return await firstValueFrom(observable) as Create_User;
  }
  
  async loginUser(usernameOrEmail : string , password : string ,  callBackFunction? : () => void){
  const observable : Observable<any | TokenResponse> =  this.httpClientService.post<any | TokenResponse>({
      controller : "auths",
      action : "login"
    } , {usernameOrEmail , password});
   
    
    const tokenResponse : TokenResponse =  await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken"  , tokenResponse.token.accesToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      console.log(tokenResponse.token.accesToken);
        this.toastrService.message("Login Successfully" , "Login" , {
          position : ToastrPosition.TopRight,
          messageType : ToastrMessageType.Success
        })
    }
    else
      this.toastrService.message("Login Failed" , "Login" , {
        messageType :ToastrMessageType.Error,
        position : ToastrPosition.TopRight
      })

    

    callBackFunction();
  }

async  googleLogin(user : SocialUser , callBackFunction? : () => void){
  const observable : Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      controller : "auths",
      action : "google-login"
    },user);

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accesToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      this.toastrService.message("Login Successfully" , "Login" , {
        position : ToastrPosition.TopRight,
        messageType : ToastrMessageType.Success
      });
    }
    callBackFunction();
  }

  async facebookLogin(user : SocialUser , callBackFunction? : () => void) {
    const observable : Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      controller : "auths",
      action : "facebook-login"
    },user);

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){
      localStorage.setItem("accessToken" , tokenResponse.token.accesToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      this.toastrService.message("Login Successfully" , "Login" , {
        messageType : ToastrMessageType.Success,
        position : ToastrPosition.TopRight
      });
    }

    callBackFunction();
  }
  async refreshTokenLogin(refreshToken : string , callBackFunction? : ()=> void){
    const observable : Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller : "auths",
      action : "refresh-token-login"
    },{
      refreshToken
    });

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accesToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
    }

   callBackFunction();

  }


  async getAllUsers(page : number = 0  , size : number = 5){
   const observable : Observable<{totalUserCount : number , users : getAllUser[]}> = await this.httpClientService.get<{totalUserCount : number , users : getAllUser[] }>({
      controller : "users",
      queryString : `page=${page}&size${size}`
    });
    const promiseData = await firstValueFrom(observable);
    return promiseData;
  }

  async assignRolesToUser(userId :string , roles : string[]){
   const observable =await this.httpClientService.post({
      controller : "users",
      action : "assign-roles-to-user"
    },{ Id : userId , Roles : roles})
    await firstValueFrom(observable);
  }

  async getRolesToUser(userId :string){  
    
   const observable : Observable<string[]> =await this.httpClientService.get<string[]>({
      controller : "users",
      action : "get-roles-to-user",
      queryString : `UserId=${userId}`
    });
   const promiseData  = await firstValueFrom(observable);
   return promiseData;
  }

  
}
