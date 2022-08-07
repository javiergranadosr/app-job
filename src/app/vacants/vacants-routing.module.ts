import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacantsRoutingModule {}
