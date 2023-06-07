import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AddBasketItem } from 'src/app/contracts/Basket/AddBasketItem';
import { listProduct } from 'src/app/contracts/product/listProduct';
import { ProductService } from 'src/app/services/admin/models/product.service';
import { BasketService } from 'src/app/services/common/basket.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{

constructor(private productService : ProductService,
   private activatedRoute : ActivatedRoute ,
    private basketService : BasketService,private toastrService : CustomToastrService){

}
 
products : listProduct[];
totalPageNumber : number;
pageList : number[] = [];
pageNo : number;
ImageBaseUrl = "https://minieticaretfilesfurkan.blob.core.windows.net";

 async ngOnInit() {
  this.activatedRoute.params.subscribe(async params => {

    this.pageNo = parseInt(params["pageNo"] ?? 1);

    const result : {totalCount : number , products : listProduct[]} = await this.productService.listProduct(this.pageNo - 1
      ,12 ,
      () => {
  
      }, erroressage => {
  
      });
    
    this.products = result.products;
    this.totalPageNumber = Math.ceil(result.totalCount / 12);

    console.log(this.totalPageNumber);

       this.pageList = [];

      if (this.pageNo - 3 <= 0)
        for (let i = 1; i <= 7; i++)
          this.pageList.push(i);

      else if (this.pageNo + 3 >= this.totalPageNumber)
        for (let i = this.totalPageNumber - 6; i <= this.totalPageNumber; i++)
          this.pageList.push(i);

      else
        for (let i = this.pageNo - 3; i <= this.pageNo + 3; i++)
          this.pageList.push(i);
  })
 

  }

  addBasket(product : listProduct){
    const item : AddBasketItem = new AddBasketItem();
    let id :string = product.id;
    item.productId = id;
    item.quantity =1;
    this.basketService.Add(item);
    this.toastrService.message("Product Added Successfully" , "Product Process" , {
      messageType : ToastrMessageType.Success,
      position : ToastrPosition.TopRight
    })
  }

}
