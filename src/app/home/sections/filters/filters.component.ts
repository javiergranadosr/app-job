import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DetailCategory } from '../../interfaces/category';
import { Filter } from '../../interfaces/filter';
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
  formFilter: FormGroup = this.fb.group({
    term: [''],
    category: [''],
    salary: [''],
  });
  dataFilter!: Filter;

  constructor(private filterService: FilterService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initFilter();
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

  initFilter() {
    this.dataFilter = {
      term: '',
      category: '',
      salary: '',
    };
    this.filterService.setFilter(this.dataFilter);
  }

  search() {
    this.dataFilter = {
      term: this.formFilter.get('term')?.value,
      category: this.formFilter.get('category')?.value,
      salary: this.formFilter.get('salary')?.value,
    };
    this.filterService.setFilter(this.dataFilter);
  }

  reset() {
    this.formFilter.get('term')?.setValue('');
    this.formFilter.get('salary')?.setValue('');
    this.formFilter.get('category')?.setValue('');
    this.search();
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
