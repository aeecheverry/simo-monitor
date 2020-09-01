import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
//import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  client: Client;
  constructor(
    private router: Router,
    private clientService: ClientService
  ) { 
  }

  ngOnInit(): void {
    this.client = history.state.client || {id:"xinwo"};
  }

}
