import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { listProduct } from 'src/app/contracts/product/listProduct';
import { ProductService } from 'src/app/services/admin/models/product.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { baseComponent, SpinnerType } from 'src/app/base/baseComponent';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductImageDialogComponent } from 'src/app/dialogs/product-image-dialog/product-image-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends baseComponent implements OnInit {

  constructor(private service : ProductService , spinner : NgxSpinnerService , private alertify : AlertifyService ,
     private dialogService : DialogService){
    super(spinner);
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate' , 'updatedDate','Image','edit' , 'delete' ];
  dataSource : MatTableDataSource<listProduct> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  async getProducts(){
   this.showSpinner(SpinnerType.BallAtom);

   const allProducts : {totalCount : number , products : listProduct[]} = await this.service.listProduct(
    this.paginator ? this.paginator.pageIndex : 0 , this.paginator ? this.paginator.pageSize : 5 ,
    () => this.hideSpinner(SpinnerType.BallAtom) , 
    errorMessage => this.alertify.message1(errorMessage , MessageType.Error , Position.TopRight ,15 , true)
   );

   this.dataSource = new MatTableDataSource<listProduct>(allProducts.products);
   this.paginator.length = allProducts.totalCount;

  }
  async ngOnInit() {
    await this.getProducts();
  }
  async pageChanged(){
    await this.getProducts();
  }

  addProductImages(id : number){
      this.dialogService.openDialog({
        componentType : ProductImageDialogComponent,
        data : id ,
        options : {
          width : "1400px"
        }
      })
  }

}
