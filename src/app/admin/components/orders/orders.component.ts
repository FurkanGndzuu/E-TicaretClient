import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { baseComponent } from 'src/app/base/baseComponent';

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
