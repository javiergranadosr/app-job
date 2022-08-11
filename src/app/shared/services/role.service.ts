import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private urlBase: string = environment.urlBase;

  constructor(private http: HttpClient) {}

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
}
