import { Component, Input, OnInit } from '@angular/core';
import { DataVacant } from 'src/app/shared/interfaces/vacant';

@Component({
  selector: 'app-card-vacant',
  templateUrl: './card-vacant.component.html',
  styleUrls: ['./card-vacant.component.css'],
})
export class CardVacantComponent implements OnInit {
  @Input() dataVacant!: DataVacant;
  constructor() {}

  ngOnInit(): void {}
}
