import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  currentUser: User;
  profileName: string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.profileName = this.currentUser.name.split(' ').map(name => name[0]).join('').toUpperCase();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
