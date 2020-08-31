import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

import { MonitorRoutingModule } from './monitor-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MonitorComponent } from './monitor.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ReportsComponent } from './reports/reports.component';
import { BillingComponent } from './billing/billing.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../helper/jwt.interceptor';
import { ErrorInterceptor } from '../helper/error.interceptor';


@NgModule({
  declarations: [DashboardComponent, MonitorComponent, ECommerceComponent, TransactionsComponent, ReportsComponent, BillingComponent],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],
  exports:[
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class MonitorModule { }
