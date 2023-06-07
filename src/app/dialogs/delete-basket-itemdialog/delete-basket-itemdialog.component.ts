import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { baseDialog } from '../base/baseDialog';

@Component({
  selector: 'app-delete-basket-itemdialog',
  templateUrl: './delete-basket-itemdialog.component.html',
  styleUrls: ['./delete-basket-itemdialog.component.scss']
})
export class DeleteBasketItemdialogComponent extends baseDialog<DeleteBasketItemdialogComponent> {

  constructor(dialogRef : MatDialogRef<DeleteBasketItemdialogComponent>){
    super(dialogRef)
  }
}

export enum DeleteBasketItemdialogAnswwer{
  Yes,No
}
