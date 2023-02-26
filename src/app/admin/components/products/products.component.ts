import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { baseComponent, SpinnerType } from 'src/app/base/baseComponent';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends baseComponent implements OnInit {
constructor(spinner : NgxSpinnerService){
  super(spinner);
}

ngOnInit(): void {
  this.showSpinner(SpinnerType.BallAtom);
}
}
