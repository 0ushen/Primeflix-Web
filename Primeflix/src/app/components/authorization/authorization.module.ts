import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginMenuComponent } from './login-menu/login-menu.component';
import { AuthorizationRoutingModule } from './authorization-routing-module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AuthorizationRoutingModule
  ],
  declarations: [LoginMenuComponent, LoginComponent, LogoutComponent],
  exports: [LoginMenuComponent, LoginComponent, LogoutComponent]
})
export class AuthorizationModule { }
