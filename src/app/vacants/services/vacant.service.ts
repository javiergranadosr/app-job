import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { ListVacant } from '../interfaces/vacant';

@Injectable({
  providedIn: 'root',
})
export class VacantService {
  private urlBase: string = environment.urlBase;

  constructor(private http: HttpClient, private authService: AuthService) {}

  get headers(): HttpHeaders {
    return new HttpHeaders().set('token', this.authService.token);
  }

  getVacantsRecruiter(author: string, page: number, limit: number) {
    const ep: string = `${this.urlBase}/vacants/vacantsRecruiter`;
    const params: HttpParams = new HttpParams()
      .set('author', author)
      .set('page', page)
      .set('limit', limit);

    return this.http
      .get<ListVacant>(ep, { headers: this.headers, params })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          console.log(error);
          throw new Error(
            'Hubo un error al obtener las vacantes del reclutador, favor de contactar a un administrador.'
          );
        })
      );
  }
}
