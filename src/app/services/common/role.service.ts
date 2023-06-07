import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ListRole } from 'src/app/contracts/Role/ListRole';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient : HttpClientService) { }

  async createRole(name : string, successCallBack? : () => void , errorCallBack? : (error) => void){
   const observable : Observable<any> = await this.httpClient.post({
      controller : "roles"
    },{Name : name});

    await firstValueFrom(observable);
  }

  async getRoles(page : number , size : number){
   const observable : Observable<{totalRoleCount : number , roles : ListRole[]}> =  await this.httpClient.get<{totalRoleCount : number , roles : ListRole[]}>({
      controller : "roles",
      queryString : `page=${page}&size=${size}`
    });

    const promiseData = await firstValueFrom(observable);
    return promiseData;
  }
}
