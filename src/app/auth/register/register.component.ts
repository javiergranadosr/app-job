import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Roles } from '../../shared/interfaces/role';
import { RoleService } from '../../shared/services/role.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  roles: Roles[] = [];
  roleSubscription!: Subscription;
  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.roleSubscription = this.roleService
      .getRoles()
      .subscribe(({ total, roles }) => {
        this.roles = roles;
        console.log(this.roles);
      });
  }

  ngOnDestroy(): void {
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }
}
