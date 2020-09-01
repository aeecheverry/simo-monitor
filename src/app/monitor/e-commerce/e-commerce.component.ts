import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss']
})
export class ECommerceComponent implements OnInit {
  client: Client;
  orders_dashboard_url: SafeResourceUrl;
  from: string = "now-1d";
  to: string = "now";
  maxDate = new Date();
  dateRange = {begin: new Date(), end: new Date()};
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.getClient();
    this.loadDashboard();
  } 

  getClient(){
    let id = this.router.url.split("/")[2];
    this.client = this.clientService.getClient(id);
  }

  loadDashboard(){
    this.orders_dashboard_url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://simoo-elasticsearch.omnixsystem.com/s/${environment.production ? 'production' : 'development'}${this.getTransactionDashboardPath(this.from,this.to)}`);
  }

  getTransactionDashboardPath (to,from){
    return `/app/kibana?#/dashboard/${this.client.dashboards.orders.id}?embed=true&_g=`+encodeURIComponent(`(refreshInterval:(pause:!t,value:0),time:(from:'${this.from}',to:'${this.to}'))`);
  }

  changeEventRange(event){
    this.changeDatesValues(event.value.begin,event.value.end);
    this.loadDashboard();
  }
  inputEventRange(type,event){
    this.changeDatesValues(event.value.begin,event.value.end);
    this.loadDashboard();
  }

  changeDatesValues(from, to){
		let begin = new Date(from);
		begin.setHours(0,0,0,0);
		this.from = new Date(begin.getTime()-(begin.getTimezoneOffset()*60000)).toISOString();
		let end = new Date(to);
		end.setHours(23,59,59,999);
		this.to = new Date(end.getTime()-(end.getTimezoneOffset()*60000)).toISOString();
	}

}
