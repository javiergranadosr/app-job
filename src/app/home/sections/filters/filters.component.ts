import { Component, OnInit } from '@angular/core';
import { Salary } from './interfaces/salary';
import { SalaryServiceService } from './services/salary-service.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  public salaries: Salary[] = [];

  constructor(private salaryService: SalaryServiceService) {}

  ngOnInit(): void {
    this.salaries = this.salaryService.getSalaries();
  }
}
