import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadDialogComponent } from '../file-upload-dialog/file-upload-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProductImageDialogComponent } from '../product-image-dialog/product-image-dialog.component';
import {MatCardModule} from '@angular/material/card';




@NgModule({
  declarations: [
 
    DeleteDialogComponent,
    ProductImageDialogComponent
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    MatDialogModule,
    MatButtonModule ,MatCardModule

  ]
})
export class DialogModule { }
