import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ResponseError } from 'src/app/shared/interfaces/error';
import { User } from '../../auth/interfaces/login';
import { AuthService } from '../../auth/services/auth.service';
import { EditProfile, Profile, ResponseProfile } from '../interfaces/profile';
import { ProfileService } from '../services/profile.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user?: User;
  patternEmail: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  patternPhone: string = '^[0-9]+-[0-9]+-[0-9]+$';
  userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.pattern(this.patternEmail)]],
    phone: ['', [Validators.required, Validators.pattern(this.patternPhone)]],
    city: ['', Validators.required],
    password: [''],
    newPassword: ['', [Validators.minLength(6)]],
    image: [''],
  });
  updateProfileSusbcription!: Subscription;
  uid: string = '0';
  errorMesagges: string[] = [];
  formatsRequired: string[] = ['image/gif', 'image/png', 'image/jpeg'];
  image!: File;
  dataProfileSusbcription!: Subscription;
  imageProfile: string = '';
  emailProfile: string = '';
  nameProfile: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    private loadingService: LoadingService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.dataUser
      ? this.authService.dataUser
      : undefined;

    if (this.user) {
      this.uid = this.user.uid;
    }

    this.setDataProfile();
  }

  validateField(field: string): boolean | undefined {
    return (
      this.userForm.get(field)?.invalid && this.userForm.get(field)?.touched
    );
  }

  validateFormat(field: string): boolean {
    return (
      this.userForm.get(field)?.getError('pattern') &&
      this.userForm.get(field)?.touched
    );
  }

  fieldRequired(field: string): boolean {
    return (
      this.userForm.get(field)?.getError('required') &&
      this.userForm.get(field)?.touched
    );
  }

  onFileChange(event: any) {
    const image: File = event.target.files[0];
    if (!this.formatsRequired.includes(image.type)) {
      Notify.failure('Formato invalido, solo se permiten imágenes.');
      this.userForm.get('image')?.reset();
      return;
    }
    this.image = image;
  }

  editProfile() {
    if (this.userForm.valid) {
      this.loadingService.loading('Actualizando datos...');
      const { name, email, phone, city, password, newPassword } =
        this.userForm.value;
      const data: EditProfile = {
        name,
        email,
        phone,
        city,
        password,
        newPassword,
      };
      this.updateProfileSusbcription = this.profileService
        .updateProfile(this.uid, data)
        .subscribe((response) => {
          if (response.status === 400) {
            this.errorMesagges = [];
            if (response.error.message) {
              this.errorMesagges.push(response.error.message);
            } else {
              const errors: ResponseError[] = response.error.errors;
              errors.forEach(({ msg }, index) => {
                this.errorMesagges.push(msg);
              });
            }
            this.loadingService.removedLoading();
            return;
          }

          if (this.image) {
            this.storageService.saveFileSuscribe(
              'users',
              response.data.uid,
              this.image
            );
          }

          this.loadingService.removedLoading();
          Notify.success('Cuenta actualizada con éxito.');
          setTimeout(() => {
            this.router.navigateByUrl('/home');
          }, 2000);
          if (
            data.email.length > 0 ||
            data.password.length > 0 ||
            data.newPassword.length > 0
          ) {
            setTimeout(() => {
              this.authService.logout();
              this.router.navigateByUrl('/auth');
            }, 2000);
          }
        });
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  setDataProfile() {
    this.loadingService.loading('Cargando datos de perfil...');
    this.dataProfileSusbcription = this.profileService
      .getProfileUserById(this.uid)
      .subscribe((response) => {
        this.userForm.get('name')?.setValue(response.name);
        this.userForm.get('phone')?.setValue(response.phone);
        this.userForm.get('city')?.setValue(response.city);

        this.imageProfile = response.image
          ? response.image
          : './assets/img/default_image.jpg';

        this.nameProfile = response.name ? response.name : '';
        this.emailProfile = response.email ? response.email : '';

        this.loadingService.removedLoading();
      });
  }

  ngOnDestroy(): void {
    if (this.updateProfileSusbcription) {
      this.updateProfileSusbcription.unsubscribe();
    }
    if (this.dataProfileSusbcription) {
      this.dataProfileSusbcription.unsubscribe();
    }
  }
}
