import { Component , Inject, OnInit } from '@angular/core';
import { baseDialog } from '../base/baseDialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationService } from 'src/app/services/common/application.service';
import { RoleService } from 'src/app/services/common/role.service';
import { ListRole } from 'src/app/contracts/Role/ListRole';
import { Action } from 'src/app/contracts/Authorize/Menu';
import { AuthorizationEndpointService } from 'src/app/services/common/authorization-endpoint.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/baseComponent';
import { MatSelectionList } from '@angular/material/list';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss']
})
export class AuthorizeMenuDialogComponent extends baseDialog<AuthorizeMenuDialogComponent> implements OnInit {


  constructor(dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthorizeMenuDialogState | any,
    private roleService : RoleService,
    private endpointService : AuthorizationEndpointService,
    private spinner : NgxSpinnerService,
    private alertify : AlertifyService){
      super(dialogRef)
  }
    roles : ListRole[];
    totalRole : number;
    SelectedRoles : Array<string>;
   
 async ngOnInit() {
  this.SelectedRoles  = await this.endpointService.getEndpointRoles(this.data.menuName , this.data.code);
  const allRoles : {totalRoleCount : number , roles : ListRole[]} =  await this.roleService.getRoles(-1 , -1);
  this.totalRole = allRoles.totalRoleCount;
  this.roles = allRoles.roles;
  
  this.roles.forEach(element => {
    if(this.SelectedRoles?.indexOf(element.name) > -1){
      element.selected = true;
    }
    else element.selected = false;
  });
  
}

  
 async assignRole(rolesComplete : MatSelectionList){
  this.spinner.show(SpinnerType.BallAtom);
  
  const roles : string[] = rolesComplete.selectedOptions.selected.map(m => m._elementRef.nativeElement.innerText)
  await this.endpointService.assignRoleToEndpoint(this.data.code , this.data.menuName , roles);

  this.spinner.hide(SpinnerType.BallAtom);
  this.alertify.message("Roles is defined" , {
    messageType : MessageType.Success,
    position : Position.TopRight
  })
  }

}
export enum AuthorizeMenuDialogState{
  Close,
  OrderComplete
}
