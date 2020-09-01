import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './monitor.menu';
import { AuthenticationService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  menu = MENU_ITEMS;
  currentUser: User;
  constructor(
    private authenticationService: AuthenticationService
  ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

}
