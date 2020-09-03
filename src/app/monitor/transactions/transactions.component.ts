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
  selectedService :string;

  succeedSelected: string;

  from:string;
  to: string;

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

  onSelectedService(event){
    let filters = {};
    if(this.selectedService){
      filters["service.keyword"] = this.selectedService;
    }
    this.setTransactionInputParams({
      queryString: this.searchControl.value,
      filters: filters,
      projection: [],
      from: "now-1d",
      to: "now"
    });
  }

  onSelectedSucceed(event){
    let filters = {};
    if(this.selectedService){
      filters["service.keyword"] = this.selectedService;
    }
    if(this.succeedSelected !== "default"){
      filters["succeed"] = this.succeedSelected
    }
    this.setTransactionInputParams({
      queryString: this.searchControl.value,
      filters: filters,
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

  onDateChangeEvent(event,piker){
    console.log(event);
    if(piker === 'start'){
      let begin = new Date(event);
      begin.setHours(0,0,0,0);
      this.from = new Date(begin.getTime()-(begin.getTimezoneOffset()*60000)).toISOString();
    }else{
      let end = new Date(event);
      end.setHours(23,59,59,999);
      this.to = new Date(end.getTime()-(end.getTimezoneOffset()*60000)).toISOString();
    }
  }

  onRefreshButton(){
    let filters = {};
    if(this.selectedService){
      filters["service.keyword"] = this.selectedService;
    }
    if(this.succeedSelected !== "default"){
      filters["succeed"] = this.succeedSelected
    }
    this.setTransactionInputParams({
      queryString: this.searchControl.value,
      filters: filters,
      projection: [],
      from: this.from,
      to: this.to
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