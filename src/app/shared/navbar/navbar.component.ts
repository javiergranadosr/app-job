import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/login';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  hasSession: boolean = false;
  dataUser!: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.dataUser) {
      this.hasSession = true;
      this.dataUser = this.authService.dataUser;
    } else {
      this.hasSession = false;
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

}
