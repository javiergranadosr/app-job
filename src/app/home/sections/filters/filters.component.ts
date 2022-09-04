import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DetailCategory } from '../../interfaces/category';
import { DetailSalary } from '../../interfaces/salary';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  salaries: DetailSalary[] = [];
  categories: DetailCategory[] = [];
  categoriesSubscription!: Subscription;
  salariesSubscription!: Subscription;

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.getCategories();
    this.getSalaries();
  }

  getCategories() {
    this.categoriesSubscription = this.filterService
      .getCategories()
      .subscribe(({ categories, total }) => {
        this.categories = categories;
      });
  }

  getSalaries() {
    this.salariesSubscription = this.filterService
      .getSalaries()
      .subscribe(({ salaries, total }) => {
        this.salaries = salaries;
      });
  }

  ngOnDestroy(): void {
    this.salaries = [];
    this.categories = [];

    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }

    if (this.salariesSubscription) {
      this.salariesSubscription.unsubscribe();
    }
  }
}
