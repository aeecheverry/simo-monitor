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
  ]
})
export class MonitorModule { }
