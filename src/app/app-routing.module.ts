import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { AuthGuard } from './guards/common/auth.guard';
import { HomeComponent } from './ui/components/home/home.component';
import { LoginComponent } from './ui/components/login/login.component';
import { AuthorizeMenuModule } from './admin/components/authorize-menu/authorize-menu.module';

const routes: Routes = [
  {path : "admin" , component : LayoutComponent , children : [
    {path : "" , component : DashboardComponent , canActivate : [AuthGuard] },
    {path : "customers" , loadChildren : () => import("./admin/components/customers/customers.module")
  .then(module => module.CustomersModule), canActivate : [AuthGuard] },
  {path : "products" , loadChildren : () => import("./admin/components/products/products.module").then(module => module.ProductsModule), canActivate : [AuthGuard] },
  {path : "orders" , loadChildren : () => import("./admin/components/orders/orders.module").then(module => module.OrdersModule), canActivate : [AuthGuard] },
  {path : "roles" , loadChildren : () => import("./admin/components/roles/roles.module").then(module => module.RolesModule), canActivate : [AuthGuard]},
    {path : "authorize" , loadChildren : () => import("./admin/components/authorize-menu/authorize-menu.module").then(module => module.AuthorizeMenuModule), canActivate : [AuthGuard]},
    {path : "users" , loadChildren : () => import("./admin/components/users/users.module").then(module => module.UsersModule) , canActivate : [AuthGuard]}
  ] , canActivate : [AuthGuard] },
  {path : "" , component : HomeComponent } , 
  {path : "baskets" , loadChildren : () => import("./ui/components/baskets/baskets.module").then(module => module.BasketsModule)},
  {path : "products" , loadChildren : () => import("./ui/components/products/products.module").then(module => module.ProductsModule)},
  {path : "register" , loadChildren : () => import("./ui/components/user-register/user-register.module").then(module => module.UserRegisterModule)},
  {path : "login" , component : LoginComponent},
  {path : "products/:pageNo" , loadChildren : () => import("./ui/components/products/products.module").then(module => module.ProductsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
