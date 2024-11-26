import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './Back/body/body.component';
import { LandingComponent } from './Front/landing/landing.component';
import { PortfolioComponent } from './Front/portfolio/portfolio.component';
import { HoldingComponent } from './Front/holding/holding.component';
import { TransactionComponent } from './Front/transaction/transaction.component';
import { PlaceOrderComponent } from './Front/place-order/place-order.component';
import { LoginComponent } from './Front/login/login.component';
import { RegisterComponent } from './Front/register/register.component';
import { OrderFormComponent } from './Front/order-form/order-form.component';
import { ListUsersComponent } from './Back/list-users/list-users.component';
import { ResetPasswordComponent } from './Front/reset-password/reset-password.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { NotAuthorizedComponent } from './Front/not-authorized/not-authorized.component';
import { ActivateAccountComponent } from './Front/activate-account/activate-account.component';
import { UserProfileComponent } from './Back/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-pwd', component: ResetPasswordComponent },
  {
    path: 'dash',
    component: BodyComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'ADMIN' },
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'list-user',
    component: ListUsersComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'ADMIN' },
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'CUSTOMER' },
  },
  { path: 'form', component: OrderFormComponent },
  { path: 'holding', component: HoldingComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'order', component: PlaceOrderComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: 'activate-account', component: ActivateAccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
