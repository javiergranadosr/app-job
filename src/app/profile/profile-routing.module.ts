import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailProfileComponent } from './detail-profile/detail-profile.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProfileComponent,
        title: 'Perfil de usuario'
      },
      {
        path: 'detail/:id',
        component: DetailProfileComponent,
        title: 'Perfil de candidato'
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
