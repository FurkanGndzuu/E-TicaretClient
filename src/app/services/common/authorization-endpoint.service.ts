import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable , firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

constructor(private httpClient : HttpClientService) { }

async assignRoleToEndpoint(code : string, menuName : string , roles : string[]){
  
const observable : Observable<any> = await this.httpClient.post({
controller : "Endpoints"
  },{ code : code , menu : menuName , roles : roles});

  await firstValueFrom(observable);
}

async getEndpointRoles(menu : string , code : string){
    const observable : Observable<string[]> = await this.httpClient.get<string[]>({
      controller : "Endpoints",
      queryString : `menu=${menu}&code=${code}`
    });

    const promiseData = await firstValueFrom(observable);
    return promiseData;
}

}
