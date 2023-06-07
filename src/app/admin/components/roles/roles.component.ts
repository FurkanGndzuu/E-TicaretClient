import { Component , ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { baseComponent } from 'src/app/base/baseComponent';
import { ListRoleComponent } from './list-role/list-role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent extends baseComponent {

  constructor(spinner : NgxSpinnerService){
    super(spinner)
  }

  @ViewChild(ListRoleComponent) listComponent : ListRoleComponent;

  createdRole(createdRole : string) {
    this.listComponent.getRoles();
  }
}
