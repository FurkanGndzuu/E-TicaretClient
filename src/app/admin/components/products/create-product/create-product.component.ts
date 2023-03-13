import { Component , OnInit , Output} from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { baseComponent, SpinnerType } from 'src/app/base/baseComponent';
import { createProduct } from 'src/app/contracts/product/createProduct';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/admin/models/product.service';
import { RequestParameterForFile } from 'src/app/services/common/file-upload/file-upload.component';

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
  @Output() fileUploadOptions : Partial<RequestParameterForFile> = {
    controller : "Product", 
    action : "Upload",
    explanation : "Choose a İmage",
    isAdminpage : true ,
    accept : ".jpg , .png ,.jpeg"
  };
  @Output() createdProduct: EventEmitter<createProduct> = new EventEmitter();
  create(Name : HTMLInputElement , Stock : HTMLInputElement , Price : HTMLInputElement){

   const product : createProduct = new createProduct();
   product.name = Name.value;
   product.price = Price.value;
   product.stock = Stock.value;


    this.productService.ProductCreate(product , () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.createdProduct.emit(product);
    },
    errorMessage => {
      this.aleritfy.message1(errorMessage, MessageType.Error,Position.TopRight,6,true)
    }
      );
  }
}
