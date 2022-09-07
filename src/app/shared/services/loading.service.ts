import { Injectable } from '@angular/core';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor() {}

  loading(message: string = 'Cargando vacantes...') {
    Loading.pulse(message, {
      svgColor: 'rgb(241 245 249)',
    });
  }

  removedLoading() {
    Loading.remove();
  }
}
