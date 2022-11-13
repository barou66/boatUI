import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationsRoutingModule } from './authentications-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationsRoutingModule
  ]
})
export class AuthenticationsModule { }
