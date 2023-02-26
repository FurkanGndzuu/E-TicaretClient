import { Component , OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { baseComponent } from 'src/app/base/baseComponent';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends baseComponent implements OnInit {
 
  constructor(spinner : NgxSpinnerService ,private httpClient : HttpClientService){
    super(spinner);
  }

  ngOnInit(): void {
    // this.httpClient.post({controller : "Product" } , {
    //   name : "Kalem" , 
    //   stock : 5000,
    //   price : 50
    // }).subscribe();
    // this.httpClient.post({controller : "Product" } , {
    //   name : "Defter" , 
    //   stock : 5000,
    //   price : 75
    // }).subscribe();
    // this.httpClient.post({controller : "Product" } , {
    //   name : "Silgi" , 
    //   stock : 5000,
    //   price : 15
    // }).subscribe();

    // this.httpClient.get({
    //   controller :"Product"
    // }).subscribe(response => {
    //   console.log(response);
    // });


    // // this.httpClient.put({
    // //   controller : "Product"
    // // },
    // // {
    // //   id :"1b1305b9-ade6-462c-9a1a-47cc80247133",
    // //   name : "Kaçak Çay" , 
    // //   stock : 5000,
    // //   price : 175
    // // }).subscribe();

    // this.httpClient.get({
    //   controller :"Product"
    // }).subscribe(response => {
    //   console.log(response);
    // });

    // this.httpClient.delete({
    //   controller  : "Product"
    // },"07d36f60-fec3-422f-aa3f-225c8d330dbf").subscribe();

    // this.httpClient.get({
    //   controller :"Product"
    // }).subscribe(response => {
    //   console.log(response);
    // });

  }
}
