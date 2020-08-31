import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../helper/auth.guard';
import { ProfileComponent } from '../user/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ClientComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: ':id',
        loadChildren: () => import('../monitor/monitor.module')
          .then(m => m.MonitorModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
