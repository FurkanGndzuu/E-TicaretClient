import { Component , Output ,EventEmitter } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { baseComponent } from 'src/app/base/baseComponent';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { RoleService } from 'src/app/services/common/role.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent extends baseComponent {
  constructor(spinner : NgxSpinnerService, private roleService : RoleService,private alertify : AlertifyService){
    super(spinner)
  }
  @Output() createdRole: EventEmitter<string> = new EventEmitter();
 async create(Name : string){
    await this.roleService.createRole(Name , () => {
      this.alertify.message("Role was added successfully",{
        messageType : MessageType.Success,
        position : Position.TopRight
      });
      this.createdRole.emit(Name);
    });
 }
}
