import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Menu } from 'src/app/contracts/Authorize/Menu';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClient : HttpClientService) { }

 async getAuthorizationEndPoints(){
  const observable : Observable<Menu[]> = await this.httpClient.get<Menu[]>({
      controller : "applicationService",
    });
    var promiseData = await firstValueFrom(observable);
    return promiseData;
  }
}
