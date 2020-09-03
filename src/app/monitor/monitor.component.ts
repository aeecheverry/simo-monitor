import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './monitor.menu';
import { AuthenticationService } from '../services/auth.service';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  menu = MENU_ITEMS;
  currentUser: User;
  sidenavToggle = false;
  clientIds: string[];

  constructor(
    private authenticationService: AuthenticationService,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    /*let id = this.router.url.split("/")[2];
    this.getClients();
    if(!this.clientIds.includes(id) || id !== "user"){
      console.log(id)
      this.router.navigate(['monitor']);
    }*/
  }

  getClients(){
    let clients = JSON.parse(localStorage.getItem('clients'));
    if(!clients){
      this.clientService.getClients()
        .pipe(first())
        .subscribe(
          data => {
            this.clientIds = data.map(client => client.id);
          },
          error => {
              //this.alertService.error(error);
          }
      );
    }else{
      this.clientIds = clients;
    }
  }

}
