import { Component , OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { baseComponent } from 'src/app/base/baseComponent';
import { SignalREnums } from 'src/app/enums/signalREnums';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signal-r.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends baseComponent implements OnInit{
constructor(spinner : NgxSpinnerService,private signalRService : SignalRService ,private alertify : AlertifyService){
super(spinner);
this.signalRService.start(SignalREnums.hubUrl);
}
ngOnInit(): void {
  this.signalRService.on(SignalREnums.ProductAddedMessage , message => {
    this.alertify.message(message , {
      messageType : MessageType.Notify,
      position : Position.TopRight,
      delay : 15,
      dismissOthers :true
    });
  })
}
}
