import { Component , OnInit } from '@angular/core';
import { baseComponent } from 'src/app/base/baseComponent';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
declare var $ : any;
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent extends baseComponent implements OnInit {
constructor(private alert :  AlertifyService , spinner : NgxSpinnerService){
super(spinner);
}
ngOnInit(): void {
  $(document).ready(function() {
    alert('I am Called From jQuery');
  });
}
m(){
  this.alert.message1("Furkan" , MessageType.Error , Position.TopLeft , 5 , false);
}
}
