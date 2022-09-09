import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { TotalCandidates } from '../interfaces/candidate';
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
}
