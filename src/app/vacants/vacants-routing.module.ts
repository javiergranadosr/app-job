import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './candidates/candidates.component';
import { DetailVacantComponent } from './detail-vacant/detail-vacant.component';
import { EditVacantComponent } from './edit-vacant/edit-vacant.component';
import { NewVacantComponent } from './new-vacant/new-vacant.component';
import { VacantsComponent } from './vacants/vacants.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: VacantsComponent,
      },
      {
        path: 'create',
        component: NewVacantComponent,
      },
      {
        path: 'detail/:id',
        component: DetailVacantComponent,
      },
      {
        path: 'edit/:id',
        component: EditVacantComponent,
      },
      {
        path: 'candidates/:id',
        component: CandidatesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacantsRoutingModule {}
