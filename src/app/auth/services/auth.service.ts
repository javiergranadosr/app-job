import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login, ResponseLogin, User } from '../interfaces/login';
import { Register, ResponseRegister } from '../interfaces/register';
import { AuthRole, Role } from '../interfaces/role';
import { AuthToken } from '../interfaces/token';

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
      map((response) => {
        return response;
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }

  login(data: Login) {
    const ep: string = `${this.urlBase}/auth/login`;
    return this.http.post<ResponseLogin>(ep, data).pipe(
      tap((response) => {
        if (response.token) {
          sessionStorage.clear();
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('data', JSON.stringify(response.data));
        }
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }

  get dataUser(): User | null {
    return sessionStorage.getItem('data')
      ? JSON.parse(sessionStorage.getItem('data')!)
      : null;
  }

  get token(): string {
    return sessionStorage.getItem('token')
      ? sessionStorage.getItem('token')!
      : '';
  }

  authToken(token: string) {
    const ep = `${this.urlBase}/auth/token`;
    const headers = new HttpHeaders().set('token', token);
    return this.http.get<AuthToken>(ep, { headers }).pipe(
      map((response) => {
        return response.hasToken;
      }),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

  authRole(userId: string, roleRequired: string[]) {
    const ep: string = `${this.urlBase}/auth/role`;
    return this.http.post<AuthRole>(ep, { userId, roleRequired }).pipe(
      map((response) => {
        return response.hasRole;
      }),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

  logout() {
    sessionStorage.clear();
  }
}
