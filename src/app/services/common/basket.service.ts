import { Injectable } from '@angular/core';
import { first, firstValueFrom, Observable } from 'rxjs';
import { AddBasketItem } from 'src/app/contracts/Basket/AddBasketItem';
import { listBasketItem } from 'src/app/contracts/Basket/listBasketItem';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClient : HttpClientService) { }

  async Add(item : AddBasketItem){
    const observable: Observable<any> = this.httpClient.post({
      controller: "Baskets"
    },item);
    await firstValueFrom(observable);
  }

  async Get() : Promise<listBasketItem[]>{
    debugger;
  const observable : Observable<listBasketItem[]> =  this.httpClient.get({
      controller : "Baskets"
    });
    debugger;
 return  await firstValueFrom(observable);
  }

  async Remove( basketItemId : string){
    const observable = this.httpClient.delete({
      controller : "baskets",
    },basketItemId);
    await firstValueFrom(observable);
  }

  async update(basketItemId : string , quantity : number){
   const observable = this.httpClient.put({
      controller : "baskets"
    },{basketItemId , quantity});
    await firstValueFrom(observable);
  }
}
