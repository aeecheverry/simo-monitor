import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../helper/auth.guard';
import { ProfileComponent } from '../user/profile/profile.component';
import { NotificationsComponent } from '../user/notifications/notifications.component';

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
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: ':id',
        loadChildren: () => import('../monitor/monitor.module')
          .then(m => m.MonitorModule),
      }
    ]
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
