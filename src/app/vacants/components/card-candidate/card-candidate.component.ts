import { Component, Input, OnInit } from '@angular/core';
import { Candidate } from '../../interfaces/candidate';

@Component({
  selector: 'app-card-candidate',
  templateUrl: './card-candidate.component.html',
  styleUrls: ['./card-candidate.component.css'],
})
export class CardCandidateComponent implements OnInit {
  @Input() candidate!: Candidate;
  constructor() {}

  ngOnInit(): void {}

  viewProfile(uid: string) {
    console.log(uid);
  }
}
