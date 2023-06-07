import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/baseComponent';
import { getOrderByIdModel } from 'src/app/contracts/Order/getOrderByIdModel';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { OrderService } from 'src/app/services/common/order.service';
import { baseDialog } from '../base/baseDialog';


@Component({
  selector: 'app-order-detail-dialogs',
  templateUrl: './order-detail-dialogs.component.html',
  styleUrls: ['./order-detail-dialogs.component.scss']
})
export class OrderDetailDialogsComponent extends baseDialog<OrderDetailDialogsComponent> implements OnInit {

  displayedColumns: string[] = ['path', 'name', 'quantity', 'price'];
  dataSource = [];

  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
    private orderService : OrderService,
    private spinner : NgxSpinnerService,
    private alertify : AlertifyService
  ) {
   super(dialogRef)
  }

  order : getOrderByIdModel;
  baseUrlImage : string = "https://minieticaretfilesfurkan.blob.core.windows.net/";

 async  ngOnInit(){
  this.order =await this.orderService.getOrderById(this.data as string);
  this.dataSource = this.order.basketItems;
  }

 async completeOrder(orderId : string){
  this.spinner.show(SpinnerType.BallAtom);
    await this.orderService.completeOrder(orderId);
    this.spinner.hide(SpinnerType.BallAtom);
    this.alertify.message("Order Completed Successfully and Message sent to user",{
      messageType : MessageType.Success,
      position : Position.TopRight
    });
  }

  
}

export enum OrderDetailDialogState{
  Close,
  OrderComplete
}
