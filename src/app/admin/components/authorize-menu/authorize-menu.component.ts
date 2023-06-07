import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { baseComponent } from 'src/app/base/baseComponent';
import { Action, Menu } from 'src/app/contracts/Authorize/Menu';
import { AuthorizeMenuDialogComponent } from 'src/app/dialogs/authorize-menu-dialog/authorize-menu-dialog.component';
import { ApplicationService } from 'src/app/services/common/application.service';
import { DialogService } from 'src/app/services/common/dialog.service';

@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrls: ['./authorize-menu.component.scss']
})
export class AuthorizeMenuComponent extends baseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService , private applicationService : ApplicationService , private dialogService : DialogService){
    super(spinner)
  }
  menus : Menu[];

  async ngOnInit(){
    this.menus =  await this.applicationService.getAuthorizationEndPoints();
  }

  getRolesforAuthorize(actionCode : string , menuName :string){
    
    this.dialogService.openDialog({
      componentType : AuthorizeMenuDialogComponent,
      data : {code : actionCode ,menuName : menuName},
      options : {
       width : "750px" 
      }
    });
  }

} 
