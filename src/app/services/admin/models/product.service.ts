import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createProduct } from 'src/app/contracts/product/createProduct';
import { listProduct } from 'src/app/contracts/product/listProduct';
import { HttpClientService } from '../../common/http-client.service';
import { AlertifyService, MessageType, Position } from '../alertify.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Product_Image_Files } from 'src/app/contracts/product/Product_Image_Files';

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

 async listProduct(page : number = 0 , size : number = 5 , successCallBack? : () => void , errorCallBack? : (errorMessage : string) => void) : Promise<{totalCount : number ,products : listProduct[]}>{
 const promisData : Promise<{totalCount : number , products : listProduct[]}> = this.httpClient.get<{totalCount : number , products : listProduct[]}>({
  controller : "Product",
  queryString : `page=${page}&size=${size}`
 }).toPromise();

 promisData.then(d => successCallBack()).catch((errorResponse : HttpErrorResponse) => {
  errorCallBack(errorResponse.message)
 });

 return await promisData;
 }

 async delete(id : string){

  const data : Observable<any> =this.httpClient.delete<any>({controller : "Product" } , id);
  
  await firstValueFrom(data);

 }

 async readImages(productId : string , successCallBack : () => void ) : Promise<Product_Image_Files[]>{
   const getObservable : Observable<Product_Image_Files[]> = this.httpClient.get<Product_Image_Files[]>({
      controller :"Product" , 
      action : "getProductImages",
    },productId);

    const ımageFiles : Product_Image_Files[] = await firstValueFrom(getObservable);
    
    successCallBack();

    return ımageFiles;
 }

 async changeShowCase(productId : string , imageId : string){
 const observable = this.httpClient.post({
    controller : "files",
    action : "ChooseImageFile"
  },{productId ,imageId});
  await firstValueFrom(observable);
 }

}
