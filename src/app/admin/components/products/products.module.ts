import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path : "", component : ProductsComponent}
    ])
  ],
  exports : [
    CreateProductComponent
  ]
})
export class ProductsModule { }
