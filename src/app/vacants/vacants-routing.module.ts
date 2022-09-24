import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenGuard } from '../shared/guards/token.guard';
import { CandidatesComponent } from './candidates/candidates.component';
import { DetailVacantComponent } from './detail-vacant/detail-vacant.component';
import { EditVacantComponent } from './edit-vacant/edit-vacant.component';
import { NewVacantComponent } from './new-vacant/new-vacant.component';
import { VacantsCandidateComponent } from './vacants-candidate/vacants-candidate.component';
import { VacantsComponent } from './vacants/vacants.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: VacantsComponent,
        title: 'Plataforma de trabajos | Vacantes publicadas',
        canActivate: [TokenGuard],
        canLoad: [TokenGuard],
      },
      {
        path: 'create',
        component: NewVacantComponent,
        title: 'Plataforma de trabajos | Crear vacante',
        canActivate: [TokenGuard],
        canLoad: [TokenGuard],
      },
      {
        path: 'detail/:id',
        component: DetailVacantComponent,
        title: 'Plataforma de trabajos | Detalle de la vacante',
      },
      {
        path: 'edit/:id',
        component: EditVacantComponent,
        title: 'Plataforma de trabajos | Editar vacante',
        canActivate: [TokenGuard],
        canLoad: [TokenGuard],
      },
      {
        path: 'candidates/:id',
        component: CandidatesComponent,
        title: 'Plataforma de trabajos | Candidatos',
        canActivate: [TokenGuard],
        canLoad: [TokenGuard],
      },
      {
        path: 'applications',
        component: VacantsCandidateComponent,
        title: 'Plataforma de trabajos | Postulaciones',
        canActivate: [TokenGuard],
        canLoad: [TokenGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacantsRoutingModule {}
