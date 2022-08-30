import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import {
  DataVacant,
  ListVacant,
  ResponseVacant,
  ResponseVacantDelete,
} from '../interfaces/vacant';

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

  createVacant(data: DataVacant) {
    const ep: string = `${this.urlBase}/vacants/create`;
    return this.http
      .post<ResponseVacant>(ep, data, { headers: this.headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  deleteVacant(id: string) {
    const ep: string = `${this.urlBase}/vacants/delete/${id}`;
    return this.http
      .delete<ResponseVacantDelete>(ep, { headers: this.headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }
}
