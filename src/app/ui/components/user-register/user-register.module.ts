import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user-register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path : "" , component : UserRegisterComponent}
    ]),
    ReactiveFormsModule
  ]
})
export class UserRegisterModule { }
