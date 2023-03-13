import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { baseComponent, SpinnerType } from 'src/app/base/baseComponent';
import { ViewChild } from '@angular/core';
import { ListComponent } from './list/list.component';
import { createProduct } from 'src/app/contracts/product/createProduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends baseComponent implements OnInit {
constructor(spinner : NgxSpinnerService){
  super(spinner);
}

ngOnInit(): void {
  this.showSpinner(SpinnerType.BallAtom);
}

@ViewChild(ListComponent) listComponents: ListComponent;

createdProduct(createdProduct: createProduct) {
  this.listComponents.getProducts();
}
}
