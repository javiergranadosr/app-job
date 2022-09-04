import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, DetailCategory } from '../interfaces/category';
import { DetailSalary, Salary } from '../interfaces/salary';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private urlBase: string = environment.urlBase;

  constructor(private http: HttpClient) {}

  getSalaries() {
    const ep: string = `${this.urlBase}/salaries`;
    return this.http.get<Salary>(ep).pipe(
      map((salaries) => {
        return salaries;
      }),
      catchError((error) => {
        throw new Error(
          'Hubo un error al obtener salarios, favor de contactar a un administrador.'
        );
      })
    );
  }

  getCategories() {
    const ep: string = `${this.urlBase}/categories`;
    return this.http.get<Category>(ep).pipe(
      map((categories) => {
        return categories;
      }),
      catchError((error) => {
        throw new Error(
          'Hubo un error al obtener las categorías, favor de contactar a un administrador.'
        );
      })
    );
  }
}
