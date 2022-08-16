import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Register} from '../interfaces/register';
import { Roles } from '../interfaces/role';
import { AuthService } from '../services/auth.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Router } from '@angular/router';
import { ResponseError } from '../../shared/interfaces/error';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  roles: Roles[] = [];
  roleSubscription!: Subscription;
  registerSubscription!: Subscription;
  patternEmail: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  registerForm: FormGroup = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.patternEmail)]],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    },
    {
      validators: [
        this.authService.equalsFields('password', 'confirmPassword'),
      ],
    }
  );
  errors: ResponseError[] = [];
  errorMesagges: string[] = [];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roleSubscription = this.authService
      .getRoles()
      .subscribe(({ total, roles }) => {
        this.roles = roles;
      });
  }

  validateField(field: string): boolean | undefined {
    return (
      this.registerForm.get(field)?.invalid &&
      this.registerForm.get(field)?.touched
    );
  }

  validateFormatEmail(): boolean {
    return (
      this.registerForm.get('email')?.getError('pattern') &&
      this.registerForm.get('email')?.touched
    );
  }

  emailRequired(): boolean {
    return (
      this.registerForm.get('email')?.getError('required') &&
      this.registerForm.get('email')?.touched
    );
  }

  vefiryPassword(): boolean {
    return (
      this.registerForm.get('confirmPassword')?.getError('noEquals') &&
      this.registerForm.get('confirmPassword')?.touched
    );
  }

  register() {
    if (this.registerForm.valid) {
      const { name, email, role, password } = this.registerForm.value;
      const data: Register = {
        name,
        email,
        roleId: role,
        password,
      };
      this.registerSubscription = this.authService
        .register(data)
        .subscribe((response) => {
          if (response.status === 400) {
            this.errorMesagges = [];
            const errors: ResponseError[] = response.error.errors;
            errors.forEach(({ msg }, index) => {
              this.errorMesagges.push(msg);
            });
            return;
          }
          Notify.success('Cuenta creada con éxito.');
          setTimeout(() => {
            this.router.navigateByUrl('/auth');
          },2000);
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.roles = [];
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }
}
