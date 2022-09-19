import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-profile',
  templateUrl: './detail-profile.component.html',
  styleUrls: ['./detail-profile.component.css'],
})
export class DetailProfileComponent implements OnInit, OnDestroy {
  id: string = '';
  dataProfileSusbcription!: Subscription;
  imageProfile: string = '';
  nameProfile: string = '';
  phoneProfile: string = '';
  emailProfile: string = '';
  cityProfile: string = '';

  constructor(
    private location: Location,
    private activedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.id = this.activedRoute.snapshot.params['id'];
    this.getDataProfile(this.id);
  }

  getDataProfile(id: string) {
    this.loadingService.loading('Cargando datos de perfil...');
    this.dataProfileSusbcription = this.profileService
      .getProfileUserById(id)
      .subscribe((response) => {
        this.imageProfile = response.image
          ? response.image
          : './assets/img/default_image.jpg';
        this.nameProfile = response.name ? response.name : '';
        this.phoneProfile = response.phone ? response.phone : 'N/A';
        this.emailProfile = response.email ? response.email : '';
        this.cityProfile = response.city ? response.city : 'N/A';
        this.loadingService.removedLoading();
      });
  }

  backCandidates() {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.dataProfileSusbcription) {
      this.dataProfileSusbcription.unsubscribe();
    }
  }
}
