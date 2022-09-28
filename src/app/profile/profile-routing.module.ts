import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../shared/guards/role.guard';
import { TokenGuard } from '../shared/guards/token.guard';
import { DetailProfileComponent } from './detail-profile/detail-profile.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProfileComponent,
        title: 'Plataforma de trabajos | Perfil de usuario',
        canActivate: [TokenGuard, RoleGuard],
        canLoad: [TokenGuard],
        data: {ROLES: ['RECRUITER', 'DEVELOPER']}
      },
      {
        path: 'detail/:id',
        component: DetailProfileComponent,
        title: 'Plataforma de trabajos | Perfil del candidato o candidata',
        canActivate: [TokenGuard, RoleGuard],
        canLoad: [TokenGuard],
        data: {ROLES: ['RECRUITER']}
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
