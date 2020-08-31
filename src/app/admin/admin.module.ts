import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ClientComponent } from './client/client.component';

import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '../helper/error.interceptor';
import { JwtInterceptor } from '../helper/jwt.interceptor';

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatBadgeModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule
  ],
  exports: [ 
    MatBadgeModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class AdminModule { }
