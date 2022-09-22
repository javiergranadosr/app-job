import { Component, Input, OnInit } from '@angular/core';
import { DataVacantCandidate } from '../../interfaces/candidate';

@Component({
  selector: 'app-card-vacant-candidate',
  templateUrl: './card-vacant-candidate.component.html',
  styleUrls: ['./card-vacant-candidate.component.css']
})
export class CardVacantCandidateComponent implements OnInit {
  @Input() dataVacant!: DataVacantCandidate;

  constructor() { }

  ngOnInit(): void {
  }

}
