import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailProfileComponent } from './detail-profile/detail-profile.component';

@NgModule({
  declarations: [ProfileComponent, DetailProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, ReactiveFormsModule],
})
export class ProfileModule {}
