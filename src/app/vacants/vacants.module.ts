import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacantsRoutingModule } from './vacants-routing.module';
import { NewVacantComponent } from './new-vacant/new-vacant.component';
import { VacantsComponent } from './vacants/vacants.component';
import { CardVacantComponent } from './components/card-vacant/card-vacant.component';


@NgModule({
  declarations: [
    NewVacantComponent,
    VacantsComponent,
    CardVacantComponent
  ],
  imports: [
    CommonModule,
    VacantsRoutingModule
  ]
})
export class VacantsModule { }
