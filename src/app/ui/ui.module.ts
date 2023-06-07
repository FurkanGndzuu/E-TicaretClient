import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule
  ],
  exports : [ComponentsModule]
})
export class UiModule { }
