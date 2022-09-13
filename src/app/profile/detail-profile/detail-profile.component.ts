import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'


@Component({
  selector: 'app-detail-profile',
  templateUrl: './detail-profile.component.html',
  styleUrls: ['./detail-profile.component.css'],
})
export class DetailProfileComponent implements OnInit {
  constructor( private location: Location) {}

  ngOnInit(): void {}

  backCandidates() {
    this.location.back();
  }
}
