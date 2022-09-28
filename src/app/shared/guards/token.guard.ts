import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.authToken(this.authService.token).pipe(
      tap((token) => {
        if (!token) {
          this.authService.logout();
          this.router.navigateByUrl('auth');
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.authToken(this.authService.token).pipe(
      tap((token) => {
        if (!token) {
          this.authService.logout();
          this.router.navigateByUrl('auth');
        }
      })
    );
  }
}
