import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './Back/body/body.component';
import { FooterComponent } from './Back/footer/footer.component';
import { NavComponent } from './Back/nav/nav.component';
import { SidebarComponent } from './Back/sidebar/sidebar.component';

import { LandingComponent } from './Front/landing/landing.component';
import { FooterFrontComponent } from './Front/footer-Front/footerFront.component';
import { HeaderComponent } from './Front/header/header.component';
import { PortfolioComponent } from './Front/portfolio/portfolio.component';
import { StockQuoteComponent } from './Front/stock-quote/stock-quote.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IntraDayComponent } from './Front/intra-day/intra-day.component';
import { HoldingComponent } from './Front/holding/holding.component';
import { TransactionComponent } from './Front/transaction/transaction.component';
import { PlaceOrderComponent } from './Front/place-order/place-order.component';
import { LoginComponent } from './Front/login/login.component';
import { OrderFormComponent } from './Front/order-form/order-form.component';
import { ListPortfolioComponent } from './Back/list-portfolio/list-portfolio.component';
import { ListOrdersComponent } from './Back/list-orders/list-orders.component';
import { DashboardComponent } from './Back/dashboard/dashboard.component';
import { RegisterComponent } from './Front/register/register.component';
import { ListUsersComponent } from './Back/list-users/list-users.component';
import { UserProfileComponent } from './Back/user-profile/user-profile.component';
import { SearchfilterPipe } from './Pipes/searchFilter.pipe';
import { UserDetailsComponent } from './Back/user-details/user-details.component';
import { ResetPasswordComponent } from './Front/reset-password/reset-password.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NotAuthorizedComponent } from './Front/not-authorized/not-authorized.component';
import { ActivateAccountComponent } from './Front/activate-account/activate-account.component';


@NgModule({
  declarations: [
    AppComponent,
//---------------- back
  BodyComponent,
  FooterComponent,
  NavComponent,
  SidebarComponent,
//------------ front
  LandingComponent,
  FooterFrontComponent,
  HeaderComponent,
  PortfolioComponent,
  StockQuoteComponent,
  IntraDayComponent,
  HoldingComponent,
  TransactionComponent,
  PlaceOrderComponent,
  LoginComponent,
  OrderFormComponent,
  ListPortfolioComponent,
  ListOrdersComponent,
  RegisterComponent,
  DashboardComponent,
  ListUsersComponent,
  UserProfileComponent,
  SearchfilterPipe,
  UserDetailsComponent,
  ResetPasswordComponent,
  NotAuthorizedComponent,
  ActivateAccountComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

