import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../auth/interfaces/login';
import { EditUser } from '../../auth/interfaces/user';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user?: User;
  patternEmail: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.patternEmail)]],
    password: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.user = this.authService.dataUser
      ? this.authService.dataUser
      : undefined;
  }

  validateField(field: string): boolean | undefined {
    return (
      this.userForm.get(field)?.invalid && this.userForm.get(field)?.touched
    );
  }

  validateFormatEmail(): boolean {
    return (
      this.userForm.get('email')?.getError('pattern') &&
      this.userForm.get('email')?.touched
    );
  }

  emailRequired(): boolean {
    return (
      this.userForm.get('email')?.getError('required') &&
      this.userForm.get('email')?.touched
    );
  }

  editProfile() {
    if (this.userForm.valid) {
      const { name, email, password, newPassword } = this.userForm.value;
      const user: EditUser = { name, email, password, newPassword };
      console.log('Edit user: ', user);
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
