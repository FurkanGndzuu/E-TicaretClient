import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { baseComponent } from 'src/app/base/baseComponent';
declare var $ : any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends baseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService){
    super(spinner);
  }

  ngOnInit(): void {
    $.get("https://localhost:7272/api/Product" ,  data => {
      console.log(data);
    });
  }

}
