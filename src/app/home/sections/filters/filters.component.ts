import { Component, OnInit } from '@angular/core';
import { Category, DetailCategory } from './interfaces/category';
import { Salary } from './interfaces/salary';
import { FilterService } from './services/filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  salaries: Salary[] = [];
  categories: DetailCategory[] = [];

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.salaries = this.filterService.getSalaries();
    this.filterService.getCategories().subscribe(({categories, total}) => {
      this.categories = categories;
    });
  }
}
