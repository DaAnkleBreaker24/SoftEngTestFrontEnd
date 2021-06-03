import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from './log-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit, OnDestroy {
  incorrectLogin = false;
  auth = false;
  username = '';
  password = '';
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.username = '';
    this.password = '';
  }

  ngOnInit(): void {}
  loginForm = this.fb.group({
    username: [''],
    password: [''],
  });
  login() {
    this.auth = this.loginService.login({
      username: this.loginForm.get('username')!.value,
      password: this.loginForm.get('password')!.value,
    });
    if (!this.auth) {
      this.incorrectLogin = true;
    } else {
      this.router.navigate(['home']);
    }
  }
  getErrorMessage() {
    return 'incorrect login';
  }
}
