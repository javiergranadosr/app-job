import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/interfaces/login';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { DataVacant } from '../../shared/interfaces/vacant';
import { VacantService } from '../services/vacant.service';

@Component({
  selector: 'app-detail-vacant',
  templateUrl: './detail-vacant.component.html',
  styleUrls: ['./detail-vacant.component.css'],
})
export class DetailVacantComponent implements OnInit, OnDestroy {
  detailVacantSubscription: Subscription = new Subscription();
  detailVacant!: DataVacant;
  user?: User;

  constructor(
    private vacantService: VacantService,
    private activedRoute: ActivatedRoute,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getDetailVacant();
    this.user = this.authService.dataUser
      ? this.authService.dataUser
      : undefined;
  }

  getDetailVacant() {
    this.loadingService.loading('Cargando información…');
    const id: string = this.activedRoute.snapshot.params['id'];
    this.detailVacantSubscription = this.vacantService
      .detailVacant(id)
      .subscribe((vacant) => {
        this.detailVacant = vacant;
        this.loadingService.removedLoading();
      });
  }

  ngOnDestroy(): void {
    if (this.detailVacantSubscription) {
      this.detailVacantSubscription.unsubscribe();
    }
  }
}
