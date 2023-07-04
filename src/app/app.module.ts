import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmPasswordResetComponent, EditUserDetailsComponent, FooterComponent, HeaderComponent, SendPasswordResetEmailComponent } from './components';
import { MaterialModule } from './material.module';
import { CartCheckoutComponent, ForgotPasswordComponent, LoginComponent, OnlineAdminComponent, OnlineUserComponent, RegisterComponent, UserManagementComponent } from './pages';

@NgModule({
  declarations: [
    AppComponent,
    OnlineAdminComponent,
    HeaderComponent,
    FooterComponent,
    UserManagementComponent,
    EditUserDetailsComponent,
    OnlineUserComponent,
    RegisterComponent,
    LoginComponent,
    CartCheckoutComponent,
    ForgotPasswordComponent,
    SendPasswordResetEmailComponent,
    ConfirmPasswordResetComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
