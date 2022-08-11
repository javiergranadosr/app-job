import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DetailCategory } from 'src/app/home/interfaces/category';
import { Salary } from 'src/app/home/interfaces/salary';
import { FilterService } from 'src/app/home/services/filter.service';

@Component({
  selector: 'app-new-vacant',
  templateUrl: './new-vacant.component.html',
  styleUrls: ['./new-vacant.component.css'],
})
export class NewVacantComponent implements OnInit, OnDestroy {
  salaries: Salary[] = [];
  categories: DetailCategory[] = [];
  salarySubscription!: Subscription;

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.salaries = this.filterService.getSalaries();
    this.salarySubscription = this.filterService
      .getCategories()
      .subscribe(({ categories, total }) => {
        this.categories = categories;
      });
  }

  ngOnDestroy(): void {
    this.salaries = [];
    this.categories = [];
    if (this.salarySubscription) {
      this.salarySubscription.unsubscribe();
    }
  }
}
