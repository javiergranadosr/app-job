import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Plataforma de trabajos | Iniciar sesión',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Plataforma de trabajos | Crear cuenta',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
