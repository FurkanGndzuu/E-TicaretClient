import { Component , Inject , Output , OnInit } from '@angular/core';
import { baseDialog } from '../base/baseDialog';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Answer, DeleteDirective } from 'src/app/directives/delete.directive';
import { DialogOptions } from 'src/app/services/common/dialog.service';
import { RequestParameterForFile } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/admin/models/product.service';
import { Product_Image_Files } from 'src/app/contracts/product/Product_Image_Files';
import { Observable } from 'rxjs';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/baseComponent';



@Component({
  selector: 'app-product-image-dialog',
  templateUrl: './product-image-dialog.component.html',
  styleUrls: ['./product-image-dialog.component.scss']
})
export class ProductImageDialogComponent extends baseDialog<ProductImageDialogComponent> implements OnInit{

  constructor( dialogRef: MatDialogRef<ProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductImageFileDialogEnum | string,
    private productService : ProductService,
    private spinner : NgxSpinnerService){
    super(dialogRef)
  }

  @Output() fileUploadOptions : Partial<RequestParameterForFile> = {
    controller : "Product",
    accept : ".jpg , .png , .jpeg , .gif",
    action : "Upload",
    isAdminpage : true,
    queryString: `id=${this.data}`

    
  }

  ImageFiles : Product_Image_Files[];

 async ngOnInit() {
  this.spinner.show(SpinnerType.BallAtom);
  
  this.ImageFiles   = await this.productService.readImages(this.data as string , () => this.spinner.hide(SpinnerType.BallAtom));
  
  }

  showCase(imageId : string){
    this.productService.changeShowCase(this.data as string , imageId);
  }

}


export enum ProductImageFileDialogEnum{
  Close
}
