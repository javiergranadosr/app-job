import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/interfaces/login';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { DataVacant } from '../../shared/interfaces/vacant';
import { Apply } from '../interfaces/candidate';
import { CandidatesService } from '../services/candidates.service';
import { VacantService } from '../services/vacant.service';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-detail-vacant',
  templateUrl: './detail-vacant.component.html',
  styleUrls: ['./detail-vacant.component.css'],
})
export class DetailVacantComponent implements OnInit, OnDestroy {
  detailVacantSubscription: Subscription = new Subscription();
  applySubscription: Subscription = new Subscription();
  detailVacant!: DataVacant;
  user?: User;

  constructor(
    private vacantService: VacantService,
    private activedRoute: ActivatedRoute,
    private authService: AuthService,
    private loadingService: LoadingService,
    private candidatesService: CandidatesService
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

  apply(vacantId: string) {
    const candidate: Apply = { candidate: this.user!.uid, vacant: vacantId };
    Confirm.show(
      'Notificación del sistema',
      '¿Desea aplicar en está vacante?',
      'Aceptar',
      'Cancelar',
      () => {
        this.loadingService.loading('Aplicando a vacante…');
        this.applySubscription = this.candidatesService
          .applyVacant(candidate)
          .subscribe((response) => {
            if (response.status === 400) {
              this.loadingService.removedLoading();
              Notify.failure(response.error.errors[0].msg);
              return;
            }
            Notify.success(response.message);
            this.loadingService.removedLoading();
          });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.detailVacantSubscription) {
      this.detailVacantSubscription.unsubscribe();
    }
  }
}
