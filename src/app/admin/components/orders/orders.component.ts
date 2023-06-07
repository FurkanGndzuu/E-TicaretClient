import { Component , ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { baseComponent } from 'src/app/base/baseComponent';
import { ListOrderComponent } from './list-order/list-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends baseComponent {
constructor(spinner :NgxSpinnerService){
  super(spinner);
}
}
