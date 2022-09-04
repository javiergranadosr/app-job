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
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-vacant',
  templateUrl: './card-vacant.component.html',
  styleUrls: ['./card-vacant.component.css'],
})
export class CardVacantComponent implements OnInit, OnDestroy {
  @Input() dataVacant!: DataVacant;
  @Output() deleted = new EventEmitter<boolean>();
  deleteVacantSubscription!: Subscription;

  constructor(private vacantService: VacantService, private router: Router) {}

  ngOnInit(): void {}

  deleteVacant(id: string) {
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

  editVacant(id: string) {
    //this.router.navigate(['vacants', 'detail', id]);
  }

  ngOnDestroy(): void {
    if (this.deleteVacantSubscription) {
      this.deleteVacantSubscription.unsubscribe();
    }
  }
}
