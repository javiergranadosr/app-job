import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ListVacant } from 'src/app/shared/interfaces/vacant';
import { environment } from 'src/environments/environment';
import { Filter } from '../interfaces/filter';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private urlBase: string = environment.urlBase;

  constructor(private http: HttpClient, private authService: AuthService) {}

  get headers(): HttpHeaders {
    return new HttpHeaders().set('token', this.authService.token);
  }

  getVacants(filters: Filter, page: number, limit: number) {
    const ep: string = `${this.urlBase}/vacants/vacantsHome`;
    const params: HttpParams = new HttpParams()
      .set('term', filters.term)
      .set('category', filters.category)
      .set('salary', filters.salary)
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
