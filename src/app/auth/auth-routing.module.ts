import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordSettingComponent } from './password-setting/password-setting.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
	  {
        path: 'forgot',
        component: ForgotPasswordComponent,
      },
	  {
        path: 'setting/:id',
        component: PasswordSettingComponent,
      }
    ],
  },
];

export const AuthRoutingModule = RouterModule.forChild(routes);
