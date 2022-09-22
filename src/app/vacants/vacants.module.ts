import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacantsRoutingModule } from './vacants-routing.module';
import { NewVacantComponent } from './new-vacant/new-vacant.component';
import { VacantsComponent } from './vacants/vacants.component';
import { CardVacantComponent } from './components/card-vacant/card-vacant.component';
import { DetailVacantComponent } from './detail-vacant/detail-vacant.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditVacantComponent } from './edit-vacant/edit-vacant.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { CardCandidateComponent } from './components/card-candidate/card-candidate.component';
import { VacantsCandidateComponent } from './vacants-candidate/vacants-candidate.component';
import { CardVacantCandidateComponent } from './components/card-vacant-candidate/card-vacant-candidate.component';

@NgModule({
  declarations: [
    NewVacantComponent,
    VacantsComponent,
    CardVacantComponent,
    DetailVacantComponent,
    EditVacantComponent,
    CandidatesComponent,
    CardCandidateComponent,
    VacantsCandidateComponent,
    CardVacantCandidateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VacantsRoutingModule,
    SharedModule,
  ],
})
export class VacantsModule {}
