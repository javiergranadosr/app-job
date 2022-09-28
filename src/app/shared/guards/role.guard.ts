import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  USER_ID: string = this.authService.dataUser?.uid
    ? this.authService.dataUser?.uid
    : '';

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const ROLES: string[] = route.data['ROLES'] as Array<string>;
    return this.authService.authRole(this.USER_ID, ROLES).pipe(
      tap((hasRole) => {
        if (!hasRole) {
          this.authService.logout();
          this.router.navigateByUrl('auth');
        }
      })
    );
  }
}
