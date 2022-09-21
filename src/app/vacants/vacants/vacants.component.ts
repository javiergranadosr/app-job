import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { DataVacant } from '../../shared/interfaces/vacant';
import { VacantService } from '../services/vacant.service';

@Component({
  selector: 'app-vacants',
  templateUrl: './vacants.component.html',
  styleUrls: ['./vacants.component.css'],
})
export class VacantsComponent implements OnInit, OnDestroy {
  uid: string = '';
  vacantsRecruiter: DataVacant[] = [];
  totalPublicVacants: number = 0;
  vacantSuscription!: Subscription;
  page: number = 0;
  limit: number = 10;
  // Pagination
  totalPages: number = 0;
  listPages: number[] = [];
  pagination: number[] = [];
  startPage: number = 0;
  endPage: number = this.limit;

  constructor(
    private vacantServices: VacantService,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.uid = this.authService.dataUser ? this.authService.dataUser.uid : '';
    this.getVacantsRecruiter(this.uid, this.page, this.limit, true);
  }

  changeVacants(page: number) {
    this.page = 0;
    this.page =
      this.listPages.indexOf(page) === 0
        ? 0
        : this.listPages.indexOf(page) * this.limit;
    this.getVacantsRecruiter(this.uid, this.page, this.limit, false);
  }

  getVacantsRecruiter(
    uid: string,
    page: number,
    limit: number,
    pagination: boolean
  ) {
    this.loadingService.loading();
    this.vacantSuscription = this.vacantServices
      .getVacantsRecruiter(uid, page, limit)
      .subscribe(({ total, vacants }) => {
        this.totalPublicVacants = total;
        this.vacantsRecruiter = vacants;
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
    for (let index = 0; index < this.totalPages; index++) {
      this.listPages.push(index + 1);
    }
    this.pagination = this.listPages.slice(this.startPage, this.endPage);
  }

  receiveDelete($event: boolean) {
    if ($event) {
      this.page = 0;
      this.totalPages = 0;
      this.listPages = [];
      this.pagination = [];
      this.startPage = 0;
      this.endPage = this.limit;
      this.getVacantsRecruiter(this.uid, this.page, this.limit, true);
    }
  }

  ngOnDestroy(): void {
    if (this.vacantSuscription) {
      this.vacantSuscription.unsubscribe();
    }
    this.vacantsRecruiter = [];
  }
}
