import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject , OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef  ,  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { baseDialog } from '../base/baseDialog';
declare var $;

@Component({
  selector: 'app-shopping-complete-dialog',
  templateUrl: './shopping-complete-dialog.component.html',
  styleUrls: ['./shopping-complete-dialog.component.scss']
})
export class ShoppingCompleteDialogComponent extends baseDialog<ShoppingCompleteDialogComponent> implements OnDestroy {

  constructor(dialogRef : MatDialogRef<ShoppingCompleteDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: ShoppingCompleteState){
    super(dialogRef)
  }

  show: boolean = false;
  complete() {
    this.show = true;
  }

  ngOnDestroy(): void {
    if (!this.show)
      $("#basketModal").modal("show");
  }
}

export enum ShoppingCompleteState{
  Yes , No
}
