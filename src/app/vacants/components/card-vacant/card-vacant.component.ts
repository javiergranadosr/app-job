import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DataVacant } from '../../interfaces/vacant';
import { VacantService } from '../../services/vacant.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Router } from '@angular/router';
import { CandidatesService } from '../../services/candidates.service';

@Component({
  selector: 'app-card-vacant',
  templateUrl: './card-vacant.component.html',
  styleUrls: ['./card-vacant.component.css'],
})
export class CardVacantComponent implements OnInit, OnDestroy {
  @Input() dataVacant!: DataVacant;
  @Output() deleted = new EventEmitter<boolean>();
  deleteVacantSubscription!: Subscription;
  totalCandidates: number = 0;
  totalCandidatesSubscription!: Subscription;

  constructor(
    private vacantService: VacantService,
    private router: Router,
    private candidatesService: CandidatesService
  ) {}

  ngOnInit(): void {
    if (this.dataVacant.uid) {
      this.getTotalCandidatesByVacant(this.dataVacant.uid);
    }
  }

  deleteVacant(id: string) {
    Confirm.show(
      'Notificación del sistema',
      '¿Desea eliminar está vacante?',
      'Aceptar',
      'Cancelar',
      () => {
        this.vacantService.deleteVacant(id).subscribe((response) => {
          if (response.delete) {
            Notify.success(response.message);
            this.deleted.emit(true);
          } else {
            Notify.failure(
              'Hubo un error eliminar vacante. Favor de hablar con un administrador.'
            );
            this.deleted.emit(false);
          }
        });
      }
    );
  }

  editVacant(id: string) {
    this.router.navigate(['vacants', 'edit', id]);
  }

  getTotalCandidatesByVacant(id: string) {
    this.totalCandidatesSubscription = this.candidatesService
      .getTotalCandidatesByVacant(id)
      .subscribe((totalCandidates) => {
        this.totalCandidates = totalCandidates;
      });
  }

  viewCandidates(id: string) {
    this.router.navigate(['vacants', 'candidates', id]);
  }

  ngOnDestroy(): void {
    if (this.deleteVacantSubscription) {
      this.deleteVacantSubscription.unsubscribe();
    }

    if (this.totalCandidatesSubscription) {
      this.totalCandidatesSubscription.unsubscribe();
    }
  }
}
