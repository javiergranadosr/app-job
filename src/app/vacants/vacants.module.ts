import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacantsRoutingModule } from './vacants-routing.module';
import { NewVacantComponent } from './new-vacant/new-vacant.component';
import { VacantsComponent } from './vacants/vacants.component';


@NgModule({
  declarations: [
    NewVacantComponent,
    VacantsComponent
  ],
  imports: [
    CommonModule,
    VacantsRoutingModule
  ]
})
export class VacantsModule { }
