import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadDialogComponent } from '../file-upload-dialog/file-upload-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProductImageDialogComponent } from '../product-image-dialog/product-image-dialog.component';
import {MatCardModule} from '@angular/material/card';
import { ShoppingCompleteDialogComponent } from '../shopping-complete-dialog/shopping-complete-dialog.component';
import { OrderDetailDialogsComponent } from '../order-detail-dialogs/order-detail-dialogs.component';
import { MatTableModule } from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthorizeMenuDialogComponent } from '../authorize-menu-dialog/authorize-menu-dialog.component';
import {MatListModule} from '@angular/material/list';
import { AuthorizeUserDialogComponent } from '../authorize-user-dialog/authorize-user-dialog.component';




@NgModule({
  declarations: [
 ShoppingCompleteDialogComponent,
    DeleteDialogComponent,
    ProductImageDialogComponent,
    OrderDetailDialogsComponent,
    AuthorizeMenuDialogComponent,
    AuthorizeUserDialogComponent
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    MatDialogModule,
    MatButtonModule ,MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatListModule

  ]
})
export class DialogModule { }
