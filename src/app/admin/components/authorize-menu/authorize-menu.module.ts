import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeMenuComponent } from './authorize-menu.component';
import {MatTreeModule} from '@angular/material/tree';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    AuthorizeMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path : "" , component : AuthorizeMenuComponent}
    ]),
    MatTreeModule,
    MatListModule,
    MatButtonModule
  ]
})
export class AuthorizeMenuModule { }
