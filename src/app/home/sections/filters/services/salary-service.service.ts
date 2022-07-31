import { Injectable } from '@angular/core';
import { Salary } from '../interfaces/salary';

@Injectable({
  providedIn: 'root',
})
export class SalaryServiceService {
  constructor() {}

  getSalaries(): Salary[] {
    return [
      {
        id: 1,
        name: '$0 - $499',
      },
      {
        id: 2,
        name: '$500 - $749',
      },
      {
        id: 3,
        name: '$750 - $999',
      },
      {
        id: 4,
        name: '$1000 - $1499',
      },
      {
        id: 5,
        name: '$1500 - $1999',
      },
      {
        id: 6,
        name: '$2000 - $2499',
      },
      {
        id: 7,
        name: '$2500 - $2999',
      },
      {
        id: 8,
        name: '$3000 - $4999',
      },
      {
        id: 9,
        name: '+$5000',
      },
    ];
  }
}
