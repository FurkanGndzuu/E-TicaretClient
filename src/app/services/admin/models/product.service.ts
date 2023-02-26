import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createProduct } from 'src/app/contracts/product/createProduct';
import { HttpClientService } from '../../common/http-client.service';
import { AlertifyService, MessageType, Position } from '../alertify.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient : HttpClientService ,private alertify : AlertifyService) { }



  ProductCreate( product : createProduct , SuccessCallBack? : () => void , errorCallBack? : any){

    this.httpClient.post({
      controller : "Product"
    },product).subscribe(response => {
      SuccessCallBack();
        this.alertify.message1("Ekleme İşleminiz Başarı ile Gerçekleşmiştir" , MessageType.Success ,  Position.BottomRight , 5 ,true);

    },
    (errorResponse : HttpErrorResponse) => {
      let message : string = "";
      const _error : Array<{key : string , value : Array<string>}> = errorResponse.error;

      _error.forEach((values , index) => {
        values.value.forEach((_v , _index) => {
          message += `${_v}<br>`;
        })
      })

      errorCallBack(message);
    }
    );
  }

  listProduct(){
    this.httpClient.get({
      controller : "Product"
    }).subscribe(response => {

    });
  }

}
