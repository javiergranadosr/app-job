import { Component, OnInit } from '@angular/core';
import { DetailCategory } from 'src/app/home/sections/filters/interfaces/category';
import { Salary } from 'src/app/home/sections/filters/interfaces/salary';
import { FilterService } from 'src/app/home/sections/filters/services/filter.service';

@Component({
  selector: 'app-new-vacant',
  templateUrl: './new-vacant.component.html',
  styleUrls: ['./new-vacant.component.css'],
})
export class NewVacantComponent implements OnInit {
  salaries: Salary[] = [];
  categories: DetailCategory[] = [];

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.salaries = this.filterService.getSalaries();
    this.filterService.getCategories().subscribe(({ categories, total }) => {
      this.categories = categories;
    });
  }
}
