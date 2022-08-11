import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category, DetailCategory } from '../../interfaces/category';
import { Salary } from '../../interfaces/salary';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  salaries: Salary[] = [];
  categories: DetailCategory[] = [];
  filterSubscription!: Subscription;

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.salaries = this.filterService.getSalaries();
    this.filterSubscription = this.filterService
      .getCategories()
      .subscribe(({ categories, total }) => {
        this.categories = categories;
      });
  }

  ngOnDestroy(): void {
    this.salaries = [];
    this.categories = [];
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
}
