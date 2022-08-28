import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacantsRoutingModule } from './vacants-routing.module';
import { NewVacantComponent } from './new-vacant/new-vacant.component';
import { VacantsComponent } from './vacants/vacants.component';
import { CardVacantComponent } from './components/card-vacant/card-vacant.component';
import { DetailVacantComponent } from './detail-vacant/detail-vacant.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NewVacantComponent,
    VacantsComponent,
    CardVacantComponent,
    DetailVacantComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VacantsRoutingModule,
    SharedModule,
  ],
})
export class VacantsModule {}
