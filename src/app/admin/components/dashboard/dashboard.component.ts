import { Component , OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { baseComponent } from 'src/app/base/baseComponent';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends baseComponent implements OnInit{
constructor(spinner : NgxSpinnerService){
super(spinner);
}
ngOnInit(): void {
  
}
}
