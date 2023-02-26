import { Component , OnInit} from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { baseComponent, SpinnerType } from 'src/app/base/baseComponent';
import { createProduct } from 'src/app/contracts/product/createProduct';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

import { ProductService } from 'src/app/services/admin/models/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent extends baseComponent implements OnInit {

  constructor(private productService : ProductService ,  spinner : NgxSpinnerService, private aleritfy : AlertifyService){
      super(spinner);
  }

  ngOnInit(): void {
    
  }

  create(Name : HTMLInputElement , Stock : HTMLInputElement , Price : HTMLInputElement){

   const product : createProduct = new createProduct();
   product.name = Name.value;
   product.price = Price.value;
   product.stock = Stock.value;


    this.productService.ProductCreate(product , () => {
      this.hideSpinner(SpinnerType.BallAtom);
    },
    errorMessage => {
      this.aleritfy.message1(errorMessage, MessageType.Error,Position.TopRight,6,true)
    }
      );
  }
}
