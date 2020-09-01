import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import CLIENTS from '../../helper/clients.mock.json';
import { Router } from '@angular/router';
import { Client } from '../../models/client';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clients: Client[];
  constructor(
    private router: Router,
    private clientService: ClientService
  ) { 
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(){
    let clients = JSON.parse(localStorage.getItem('clients'));
    if(!clients){
      this.clientService.getClients()
        .pipe(first())
        .subscribe(
          data => {
            this.clients = data;
          },
          error => {
              //this.alertService.error(error);
          }
      );
    }else{
      this.clients = clients;
    }
  }

  onClickClient(client){
    this.router.navigate(['monitor/'+client.id],{state:{client:client}});
  }

}
