import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { EditProfile, Profile, ResponseProfile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private urlBase: string = environment.urlBase;

  constructor(private http: HttpClient, private authService: AuthService) {}

  get headers(): HttpHeaders {
    return new HttpHeaders().set('token', this.authService.token);
  }

  updateProfile(id: string, data: EditProfile) {
    const ep: string = `${this.urlBase}/users/update/${id}`;
    return this.http
      .put<ResponseProfile>(ep, data, { headers: this.headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  getProfileUserById(id: string) {
    const ep: string = `${this.urlBase}/users/profile/${id}`;
    return this.http.get<Profile>(ep, { headers: this.headers }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.log(error);
        throw new Error(
          'Hubo un error al obtener perfil de usuario, favor de contactar a un administrador.'
        );
      })
    );
  }
}
