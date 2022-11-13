import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/cores/services/auth.service';
import { BOATS } from 'src/app/cores/routes.const';
import FormHelper from 'src/app/cores/helpers/formHelper';
import { NavigationService } from 'src/app/cores/services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  _username = new FormControl('',Validators.required);
  _password = new FormControl('',Validators.required);
  loginForm = this.fb.group({
    username: this._username,
    password: this._password
  });

  constructor(
    private fb: FormBuilder,
   private authService: AuthService,
    private navigationService:NavigationService
  ) {}

  ngOnInit(): void {
   this.authService.checkIfAlreadyAuthenticated();
    this.authService.authStatus$.subscribe(status=>{
      if(status.isAuthenticated) {
        this.navigationService.routeToPath(BOATS);
      }
    })
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService
        .login(FormHelper.getControlValue(this._username), FormHelper.getControlValue(this._password))
        .subscribe(
          (resultat) => {
            this.navigationService.routeToPath(BOATS)
          }
        );
    }
  }
}
