import { Component } from '@angular/core';
import { baseComponent } from 'src/app/base/baseComponent';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends baseComponent {

  constructor(spinner : NgxSpinnerService){
    super(spinner);
  }

}
