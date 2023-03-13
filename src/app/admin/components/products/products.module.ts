import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListComponent } from './list/list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DeleteDirective } from 'src/app/directives/delete.directive';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { FileUploadModule } from "../../../services/common/file-upload/file-upload.module";
import { DialogModule } from '@angular/cdk/dialog';



@NgModule({
    declarations: [
        ProductsComponent,
        CreateProductComponent,
        ListComponent,
        DeleteDirective,
        
    ],
    exports: [
        CreateProductComponent,
        DeleteDirective,
        FileUploadModule,
        DialogModule
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: "", component: ProductsComponent }
        ]),
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        FileUploadModule
    ]
})
export class ProductsModule { }
