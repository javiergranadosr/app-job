import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponseError } from 'src/app/shared/interfaces/error';
import { Login } from '../interfaces/login';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginSuscription!: Subscription;
  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMesagges: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  validateField(field: string): boolean | undefined {
    return (
      this.loginForm.get(field)?.invalid && this.loginForm.get(field)?.touched
    );
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const data: Login = { email, password };
      this.loginSuscription = this.authService
        .login(data)
        .subscribe((response) => {
          if (response.status === 400) {
            this.errorMesagges = [];
            if (response.error.errors) {
              const errors: ResponseError[] = response.error.errors;
              errors.forEach(({ msg }) => {
                this.errorMesagges.push(msg);
              });
            } else {
              this.errorMesagges.push(response.error.message);
            }
            return;
          }
          this.router.navigateByUrl('/home');
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    if (this.loginSuscription) {
      this.loginSuscription.unsubscribe();
    }
  }
}
