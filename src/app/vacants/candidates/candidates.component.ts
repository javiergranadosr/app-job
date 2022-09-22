import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { Candidate } from '../interfaces/candidate';
import { CandidatesService } from '../services/candidates.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
})
export class CandidatesComponent implements OnInit, OnDestroy {
  uid: string = '';
  candidates: Candidate[] = [];
  totalCandidates: number = 0;
  nameVacant: string = '';
  candidatesSubscription: Subscription = new Subscription();
  // Pagination
  page: number = 0;
  limit: number = 10;
  totalPages: number = 0;
  listPages: number[] = [];
  pagination: number[] = [];
  startPage: number = 0;
  endPage: number = this.limit;

  constructor(
    private candidatesService: CandidatesService,
    private activedRoute: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.uid = this.activedRoute.snapshot.params['id'];
    this.getCandidatesByVacant(this.uid, this.page, this.limit, true);
  }

  changeCandidates(page: number) {
    this.page = 0;
    this.page =
      this.listPages.indexOf(page) === 0
        ? 0
        : this.listPages.indexOf(page) * this.limit;
    this.getCandidatesByVacant(this.uid, this.page, this.limit, false);
  }

  getCandidatesByVacant(
    uid: string,
    page: number,
    limit: number,
    pagination: boolean
  ) {
    this.loadingService.loading('Cargando candidatos...');
    this.candidatesSubscription = this.candidatesService
      .getCandidatesByVacant(uid, page, limit)
      .subscribe(({ total, candidates }) => {
        if (candidates.length > 0) {
          this.totalCandidates = total;
          this.candidates = candidates;
          this.nameVacant = candidates[0].vacant.title
            ? candidates[0].vacant.title
            : '';
          if (pagination) {
            this.totalPages = Math.ceil(total / this.limit);
            this.changePages();
          }
        }
        this.loadingService.removedLoading();
      });
      this.loadingService.removedLoading();
  }

  changePages() {
    this.listPages = [];
    for (let index = 0; index < this.totalPages; index++) {
      this.listPages.push(index + 1);
    }
    this.pagination = this.listPages.slice(this.startPage, this.endPage);
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

  ngOnDestroy(): void {
    if (this.candidatesSubscription) {
      this.candidatesSubscription.unsubscribe();
    }
    this.candidates = [];
  }
}
