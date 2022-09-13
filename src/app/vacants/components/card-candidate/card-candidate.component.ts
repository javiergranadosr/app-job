import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from '../../interfaces/candidate';

@Component({
  selector: 'app-card-candidate',
  templateUrl: './card-candidate.component.html',
  styleUrls: ['./card-candidate.component.css'],
})
export class CardCandidateComponent implements OnInit {
  @Input() candidate!: Candidate;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewProfile(uid: string) {
    this.router.navigate(['profile', 'detail', 1]);
  }
}
