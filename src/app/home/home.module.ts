import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { BannerComponent } from './sections/banner/banner.component';
import { HomeComponent } from './home/home.component';
import { FiltersComponent } from './sections/filters/filters.component';
import { ListVacantsComponent } from './sections/list-vacants/list-vacants.component';
import { CardVacantComponent } from './components/card-vacant/card-vacant.component';


@NgModule({
  declarations: [
    BannerComponent,
    HomeComponent,
    FiltersComponent,
    ListVacantsComponent,
    CardVacantComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
