import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../interfaces/category';
import { Filter } from '../interfaces/filter';
import { Salary } from '../interfaces/salary';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private urlBase: string = environment.urlBase;
  private filter$: BehaviorSubject<Filter> = new BehaviorSubject<Filter>({
    term: '',
    category: '',
    salary: '',
  });

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

  setFilter(filter: Filter) {
    this.filter$.next(filter);
  }

  getFilter$(): Observable<Filter> {
    return this.filter$.asObservable();
  }
}
