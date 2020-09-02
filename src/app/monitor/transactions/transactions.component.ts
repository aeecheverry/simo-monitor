import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactionsInputParams: TransactionInputAPI;
  services: string[] = ["OOM.SERVICE01","OOM.SERVICE02"];
  serviceControl = new FormControl();
  client: Client;
  
  constructor(
    private router: Router,
    private clientService: ClientService
  ) { 
    this.getClient();
  }

  ngOnInit(): void {
    this.transactionsInputParams = {
      queryString: "",
      filters: {},
      projection: [],
      from: "now-2d",
      to: "now",
      limit: 10,
      skip: 0,
      sortBy: {},
      clientId: this.client.id
    }
  }

  getClient(){
    let id = this.router.url.split("/")[2];
    this.client = this.clientService.getClient(id);
  }
}

export interface TransactionInputAPI {
  queryString: string,
  filters: object,
  projection:string[],
  from: string,
  to: string,
  limit: number,
  skip: number,
  sortBy: any, 
  clientId: string
}