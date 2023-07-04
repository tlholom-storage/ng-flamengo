import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_Helpers/guards/auth.guard';
import {
  AccountManagementComponent,
  CartCheckoutComponent,
  ForgotPasswordComponent,
  LoginComponent,
  OnlineAdminComponent,
  OnlineUserComponent,
  ProductManagementComponent,
  RegisterComponent,
  ShoppingProcessManagementComponent,
  UserManagementComponent,
} from './pages';

const routes: Routes = [
  {
    path: 'online-admin',
    component: OnlineAdminComponent,
    children: [
      { path: 'user-management', component: UserManagementComponent },
      { path: 'product-management', component: ProductManagementComponent },
      {
        path: 'shopping-process-management',
        component: ShoppingProcessManagementComponent,
      },
    ],
  },
  {
    path: '',
    component: OnlineUserComponent,
    children: [{ path: 'account', component: AccountManagementComponent }],
  },
  { path: 'account/register', component: RegisterComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/forgot-password', component: ForgotPasswordComponent },
  {
    path: 'cart/checkout',
    component: CartCheckoutComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
