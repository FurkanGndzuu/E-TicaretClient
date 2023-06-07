import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListRoleComponent } from './list-role/list-role.component';
import { CreateRoleComponent } from './create-role/create-role.component';



@NgModule({
  declarations: [
    RolesComponent,
    ListRoleComponent,
    CreateRoleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path : "", component : RolesComponent}
    ]),
    MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule
  ],
  exports : [
    CreateRoleComponent
  ]
})
export class RolesModule { }
