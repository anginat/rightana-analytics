import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, BackendService, ServerConfig } from '../backend.service';
import { RValidators } from '../forms/rvalidators';

@Component({
  selector: 'rana-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  config: ServerConfig;

  constructor(
    private fb: FormBuilder,
    private backend: BackendService,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, RValidators.email],
      password: [null, RValidators.password]
    });
    this.getConfig();
  }

  getConfig() {
    this.backend.getConfig()
      .subscribe(config => this.config = config);
  }

  login() {
    this.backend
      .createAuthToken(this.form.value)
      .subscribe(token => {
        this.auth.set(token.id, token.user_info.name, token.user_info.is_admin);
        this.router.navigateByUrl(token.user_info.name);
      });
  }
}
