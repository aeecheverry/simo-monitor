import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ClientComponent } from './client/client.component';

import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatBadgeModule,
    MatMenuModule
  ],
  exports: [ 
    MatBadgeModule,
    MatMenuModule 
  ]
})
export class AdminModule { }
