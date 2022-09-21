import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataVacant } from 'src/app/shared/interfaces/vacant';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { Filter } from '../../interfaces/filter';
import { FilterService } from '../../services/filter.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-list-vacants',
  templateUrl: './list-vacants.component.html',
  styleUrls: ['./list-vacants.component.css'],
})
export class ListVacantsComponent implements OnInit, OnDestroy{
  getVacantsSubscription!: Subscription;
  filterSubscription!: Subscription;
  vacants: DataVacant[] = [];
  totalPublicVacants: number = 0;
  filters!: Filter;

  page: number = 0;
  limit: number = 10;
  startPage: number = 0;
  totalPages: number = 0;
  listPages: number[] = [];
  pagination: number[] = [];
  endPage: number = this.limit;

  constructor(
    private homeService: HomeService,
    private loadingService: LoadingService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.filterSubscription = this.filterService
      .getFilter$()
      .subscribe((filters) => {
        if (filters) {
          this.filters = filters;
          this.getVacants(this.filters, this.page, this.limit, true);
        }
      });
  }

  changeVacants(page: number) {
    this.page = 0;
    this.page =
      this.listPages.indexOf(page) === 0
        ? 0
        : this.listPages.indexOf(page) * this.limit;
    this.getVacants(this.filters, this.page, this.limit, false);
  }

  getVacants(
    filters: Filter,
    page: number,
    limit: number,
    pagination: boolean
  ) {
    this.loadingService.loading();
    this.getVacantsSubscription = this.homeService
      .getVacants(filters, page, limit)
      .subscribe(({ vacants, total }) => {
        this.totalPublicVacants = total;
        this.vacants = vacants;
        if (pagination) {
          this.totalPages = Math.ceil(total / this.limit);
          this.changePages();
        }
        this.loadingService.removedLoading();
      });
  }

  prevPage() {
    if (this.startPage < this.totalPages) {
      this.startPage -= this.limit;
    }

    if (this.endPage === this.limit) {
      this.endPage = this.limit;
    } else {
      this.endPage -= this.limit;
    }

    this.pagination = [];
    this.pagination = this.listPages.slice(this.startPage, this.endPage);
  }

  nextPage() {
    if (this.startPage < this.totalPages) {
      this.startPage += this.limit;
    }

    if (this.endPage < this.totalPages) {
      this.endPage += this.limit;
    }

    this.pagination = [];
    this.pagination = this.listPages.slice(this.startPage, this.endPage);
  }

  changePages() {
    this.listPages = [];
    for (let index = 0; index < this.totalPages; index++) {
      this.listPages.push(index + 1);
    }
    this.pagination = this.listPages.slice(this.startPage, this.endPage);
  }

  ngOnDestroy(): void {
    if (this.getVacantsSubscription) {
      this.getVacantsSubscription.unsubscribe();
    }
  }
}
