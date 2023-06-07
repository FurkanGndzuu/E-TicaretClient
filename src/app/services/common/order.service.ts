import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { createOrder } from 'src/app/contracts/Order/createOrder';
import { getAllOrder } from 'src/app/contracts/Order/getAllOrder';
import { getOrderByIdModel } from 'src/app/contracts/Order/getOrderByIdModel';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient : HttpClientService) { }

  async createOrder(order : createOrder){
  
     const observable : Observable<any> = this.httpClient.post({
        controller : "orders"
      },order)

      await firstValueFrom(observable);
  }

  async getOrdes(page : number = 0 , size : number = 5){

  const observable : Observable<{totalOrderCount : number , orders : getAllOrder[]}> = await this.httpClient.get<{totalOrderCount : number , orders : getAllOrder[]}>({
      controller : "Orders",
      queryString : `page=${page}&size=${size}`
    });

    const promiseData =await firstValueFrom(observable);
    
    return promiseData;
    
  }
 async getOrderById(id :string){
  const observable : Observable<getOrderByIdModel> = this.httpClient.get<getOrderByIdModel>({
    controller : "orders",
    action : "getOrderById"
  },id);
  const promiseData = await firstValueFrom(observable);
  

  return promiseData;
  }

  async completeOrder(orderId : string){
    const observable = this.httpClient.post({
      controller : "orders",
      action : "completeOrder"
    },{orderId});

    firstValueFrom(observable);
  }
}
