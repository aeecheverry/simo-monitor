import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactionsInputParams: TransactionInputAPI;
  client: Client;
  
  searchControl = new FormControl();
  lastSearch: string [] = ["query"];
  searchOptions: Observable<string[]>;

  servicesControl = new FormControl();
  services: string[] = ["OOM.SERVICE01","OOM.SERVICE02"];
  servicesFiltered: Observable<string[]>;

  succeedSelected: string;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private transactionService : TransactionService
  ) { 
    this.getClient();
  }

  ngOnInit(): void {
    this.setTransactionInputParams({
      queryString: "",
      filters: {},
      projection: [],
      from: "now-1d",
      to: "now"
    });
    this.transactionService.listServices(this.transactionsInputParams).subscribe(
      data=>{
        this.services=data;
        this.servicesFiltered = this.servicesControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value, this.services))
        );
    });
    
    this.searchOptions = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.lastSearch))
    );
  }

  private _filter(value: string, data:string[]): string[] {
    const filterValue = value.toLowerCase();
    return data.filter(option => option.toLowerCase().includes(filterValue));
  }

  setTransactionInputParams({queryString, filters, projection, from, to}){
    this.transactionsInputParams = {
      queryString: queryString || "",
      filters: filters || {},
      projection: projection || [],
      from: from || "now-1d",
      to: to || "now",
      limit: 10,
      skip: 0,
      sortBy: {},
      clientId: this.client.id
    }
  }

  search(){
    if(this.lastSearch.includes(this.searchControl.value)){
      this.lastSearch = this.lastSearch.filter(item => item !== this.searchControl.value)
    }
    this.lastSearch.splice(0,0,this.searchControl.value);
    if(this.lastSearch.length > 10){
      this.lastSearch = this.lastSearch.slice(0,10);
    }
    this.setTransactionInputParams({
      queryString: this.searchControl.value,
      filters: {},
      projection: [],
      from: "now-1d",
      to: "now"
    });
    this.transactionService.listServices(this.transactionsInputParams).subscribe(
      data=>{
        this.services=data;
        this.servicesFiltered = this.servicesControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value, this.services))
        );
    });
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