import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { ResponseStorage } from '../interfaces/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private urlBase: string = environment.urlBase;

  constructor(private http: HttpClient, private authService: AuthService) {}

  get headers(): HttpHeaders {
    return new HttpHeaders().set('token', this.authService.token);
  }

  private saveFile(
    collection: string = '',
    id: string = '',
    formData: FormData
  ) {
    const ep: string = `${this.urlBase}/storages/uploadFile/${collection}/${id}`;
    return this.http
      .put<ResponseStorage>(ep, formData, { headers: this.headers })
      .pipe(
        map((response) => {
          response.update;
        }),
        catchError((error) => {
          return of(false);
        })
      );
  }

  saveFileSuscribe(collection: string, id: string, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    this.saveFile(collection, id, formData).subscribe((__) => {
      console.log('Archivo agregado con éxito.');
    });
  }
}
