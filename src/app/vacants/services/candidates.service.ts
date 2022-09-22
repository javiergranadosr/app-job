import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Candidates, TotalCandidates, Apply, ResponseAppy, VacantsCandidate } from '../interfaces/candidate';
import { map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  private urlBase: string = environment.urlBase;

  constructor(private http: HttpClient, private authService: AuthService) {}

  get headers(): HttpHeaders {
    return new HttpHeaders().set('token', this.authService.token);
  }

  getTotalCandidatesByVacant(id: string) {
    const ep: string = `${this.urlBase}/candidates/total/${id}`;
    return this.http.get<TotalCandidates>(ep, { headers: this.headers }).pipe(
      map((response) => {
        return response.total;
      }),
      catchError((error) => {
        return of(0);
      })
    );
  }

  getCandidatesByVacant(id: string, page: number, limit: number) {
    const ep: string = `${this.urlBase}/candidates/candidatesByVacant`;
    const params: HttpParams = new HttpParams()
      .set('id', id)
      .set('page', page)
      .set('limit', limit);

    return this.http
      .get<Candidates>(ep, { headers: this.headers, params })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          console.log(error);
          throw new Error(
            'Hubo un error al obtener candidatos, favor de contactar a un administrador.'
          );
        })
      );
  }

  applyVacant(candidate: Apply) {
    const ep: string = `${this.urlBase}/candidates/apply`;
    return this.http.post<ResponseAppy>(ep, candidate, { headers: this.headers }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.log(error);
        return of(error);
      })
    );
  }

  getVacantsCandidates(candidate: string, page: number, limit: number) {
    const ep: string = `${this.urlBase}/candidates/vacantsCandidate`;
    const params: HttpParams = new HttpParams()
      .set('candidate', candidate)
      .set('page', page)
      .set('limit', limit);

    return this.http
      .get<VacantsCandidate>(ep, { headers: this.headers, params })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          console.log(error);
          throw new Error(
            'Hubo un error al obtener las vacantes del candidato o candidata, favor de contactar a un administrador.'
          );
        })
      );
  }


}
