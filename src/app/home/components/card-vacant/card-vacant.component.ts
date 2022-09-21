import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/auth/interfaces/login';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataVacant } from 'src/app/shared/interfaces/vacant';

@Component({
  selector: 'app-card-vacant',
  templateUrl: './card-vacant.component.html',
  styleUrls: ['./card-vacant.component.css'],
})
export class CardVacantComponent implements OnInit {
  @Input() dataVacant!: DataVacant;
  user?: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.dataUser
      ? this.authService.dataUser
      : undefined;
  }
}
