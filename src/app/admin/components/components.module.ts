import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomersModule,
    ProductsModule,
    OrdersModule,
    DashboardModule,
    RolesModule,
    UsersModule
  ],
  exports : [
    ProductsModule
  ]
})
export class ComponentsModule { }
