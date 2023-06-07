import { Component , OnInit } from '@angular/core';
import { baseComponent, SpinnerType } from 'src/app/base/baseComponent';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasketService } from 'src/app/services/common/basket.service';
import { listBasketItem } from 'src/app/contracts/Basket/listBasketItem';
import { createOrder } from 'src/app/contracts/Order/createOrder';
import { OrderService } from 'src/app/services/common/order.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ShoppingCompleteDialogComponent, ShoppingCompleteState } from 'src/app/dialogs/shopping-complete-dialog/shopping-complete-dialog.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
declare var $;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends baseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService , private basketService : BasketService, private orderService : OrderService,
    private router : Router , private dialogService : DialogService , private toastrService : CustomToastrService){
    super(spinner);
  }

  basketItems : listBasketItem[];
  baseUrlImage : string = "https://minieticaretfilesfurkan.blob.core.windows.net";

 async ngOnInit() {
  this.showSpinner(SpinnerType.BallAtom);
   this.basketItems = await this.basketService.Get();
   this.hideSpinner(SpinnerType.BallAtom);
  }

  removeBasketItem(Id : string , event : HTMLButtonElement){
    this.showSpinner(SpinnerType.BallAtom);
    this.basketService.Remove(Id);
    $(event.parentElement).fadeOut(500, () => this.hideSpinner(SpinnerType.BallAtom));
  }
  changeQuantity(object){
    this.showSpinner(SpinnerType.BallAtom);
    const basketItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value;
    this.basketService.update(basketItemId , quantity);
    this.hideSpinner(SpinnerType.BallAtom);
  }

 async createOrder(){

  $("#exampleModal").modal("hide");

  this.dialogService.openDialog({
    componentType : ShoppingCompleteDialogComponent,
    data : ShoppingCompleteState.Yes,
    afterClosed : async () => {
      this.showSpinner(SpinnerType.BallAtom);
      const order : createOrder = new createOrder();
      order.adress = "Adress";
      order.description = "Description";

     await this.orderService.createOrder(order);
    
      this.hideSpinner(SpinnerType.BallAtom);
      this.toastrService.message("Your Order Has Been Delivered to Us" , "Order Completed!", {
        messageType : ToastrMessageType.Success,
        position : ToastrPosition.TopRight
      })
      this.router.navigate(["/"]);
    }
  })

   
  }

}
