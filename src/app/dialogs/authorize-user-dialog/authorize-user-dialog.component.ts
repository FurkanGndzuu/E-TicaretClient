import { Component , Inject, OnInit } from '@angular/core';
import { baseDialog } from '../base/baseDialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from 'src/app/services/common/role.service';
import { ListRole } from 'src/app/contracts/Role/ListRole';
import { MatSelectionList } from '@angular/material/list';
import { UserService } from 'src/app/services/common/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SpinnerType } from 'src/app/base/baseComponent';


@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.scss']
})
export class AuthorizeUserDialogComponent extends baseDialog<AuthorizeUserDialogComponent> implements OnInit {
  constructor(dialogRef: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthorizeUserDialogState | string,
    private roleService : RoleService,
    private userService : UserService,
    private spinner : NgxSpinnerService,
    private alertify : AlertifyService){
      super(dialogRef)
  }
    roles : ListRole[];
    totalRole : number;
    selectedRoles : Array<string>;
    
   
 async ngOnInit() {
 this.selectedRoles =await this.userService.getRolesToUser(this.data as string);
  const allRoles : {totalRoleCount : number , roles : ListRole[]} =  await this.roleService.getRoles(-1 , -1);
  this.totalRole = allRoles.totalRoleCount;
  this.roles = allRoles.roles;

 for(let i = 0 ; i<this.roles.length;i++){
      if(this.selectedRoles.indexOf(this.roles[i].name) > -1)
        this.roles[i].selected = true;
 }
  }

 async assignRolesToUser(rolesComplete : MatSelectionList){
  this.spinner.show(SpinnerType.BallAtom);
    await  this.userService.assignRolesToUser(this.data as string , rolesComplete.selectedOptions.selected.map(m => m._elementRef.nativeElement.innerText));
    this.spinner.hide(SpinnerType.BallAtom);
    this.alertify.message("Roles is defined to user" , {
      messageType : MessageType.Success,
      position : Position.TopRight
    })
  }

}
export enum AuthorizeUserDialogState{
  Close,
  Authorize
}

