import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { DataVacantCandidate, VacantsCandidate } from '../interfaces/candidate';
import { CandidatesService } from '../services/candidates.service';

@Component({
  selector: 'app-vacants-candidate',
  templateUrl: './vacants-candidate.component.html',
  styleUrls: ['./vacants-candidate.component.css'],
})
export class VacantsCandidateComponent implements OnInit, OnDestroy {
  uid: string = '';
  vacantsCandidate: DataVacantCandidate[] = [];
  totalVacants: number = 0;
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
    private candidatesService: CandidatesService,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.uid = this.authService.dataUser ? this.authService.dataUser.uid : '';
    this.getVacantsCandidate(this.uid, this.page, this.limit, true);
  }

  changeVacants(page: number) {
    this.page = 0;
    this.page =
      this.listPages.indexOf(page) === 0
        ? 0
        : this.listPages.indexOf(page) * this.limit;
    this.getVacantsCandidate(this.uid, this.page, this.limit, false);
  }

  getVacantsCandidate(
    uid: string,
    page: number,
    limit: number,
    pagination: boolean
  ) {
    this.loadingService.loading();
    this.vacantSuscription = this.candidatesService
      .getVacantsCandidates(uid, page, limit)
      .subscribe(({ total, vacants }) => {
        this.totalVacants = total;
        this.vacantsCandidate = vacants;
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
    if (this.vacantSuscription) {
      this.vacantSuscription.unsubscribe();
    }
    this.vacantsCandidate = [];
  }

}
