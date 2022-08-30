import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataVacant } from '../../interfaces/vacant';
import { VacantService } from '../../services/vacant.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-card-vacant',
  templateUrl: './card-vacant.component.html',
  styleUrls: ['./card-vacant.component.css'],
})
export class CardVacantComponent implements OnInit, OnDestroy {
  @Input() dataVacant!: DataVacant;
  @Output() deleted = new EventEmitter<boolean>();
  deleteVacantSubscription!: Subscription;

  constructor(private vacantService: VacantService) {}

  ngOnInit(): void {
  }

  deleteVacant(id: string) {
   this.vacantService.deleteVacant(id).subscribe(response => {
      if (response.delete) {
        Notify.success(response.message);
        this.deleted.emit(true);
      }else {
        Notify.failure("Hubo un error eliminar vacante. Favor de hablar con un administrador.");
        this.deleted.emit(false);
      }
   });
  }

  ngOnDestroy(): void {
    if (this.deleteVacantSubscription) {
      this.deleteVacantSubscription.unsubscribe();
    }
  }

}
