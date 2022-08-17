import {
  Component,
  DoCheck,
} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'Plataforma de trabajos';
  pathname: string = '';
  hasNavbar: boolean = false;

  constructor() {}

  ngDoCheck(): void {
    this.pathname = window.location.pathname;
    if (this.pathname === '/auth' || this.pathname === '/auth/register') {
      this.hasNavbar = false;
    } else {
      this.hasNavbar = true;
    }
  }
}
