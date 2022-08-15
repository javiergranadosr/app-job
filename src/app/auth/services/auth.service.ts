import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register, ResponseRegister } from '../interfaces/register';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBase: string = environment.urlBase;

  constructor(private http: HttpClient) {}

  equalsFields(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass = formGroup.get(password)?.value;
      const confPass = formGroup.get(confirmPassword)?.value;

      if (pass !== confPass) {
        formGroup.get(confirmPassword)?.setErrors({ noEquals: true });
        return { noEquals: true };
      }

      formGroup.get(confirmPassword)?.setErrors(null);
      return null;
    };
  }

  getRoles() {
    const ep: string = `${this.urlBase}/roles`;
    return this.http.get<Role>(ep).pipe(
      map((roles) => {
        return roles;
      }),
      catchError((error) => {
        throw new Error(
          'Hubo un error al obtener los roles, favor de contactar a un administrador.'
        );
      })
    );
  }

  register(data: Register) {
    const ep: string = `${this.urlBase}/users/create`;
    return this.http.post<ResponseRegister>(ep, data).pipe(
      map(response => {
        return response
      }),
      catchError((error) => {
        return of(error);
      })
    )
  }








}
