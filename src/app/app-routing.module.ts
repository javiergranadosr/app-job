import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((h) => h.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((a) => a.AuthModule),
  },
  {
    path: 'vacants',
    loadChildren: () => import('./vacants/vacants.module').then((v) => v.VacantsModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then((p) => p.ProfileModule),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
