import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  client: Client;
  transactions_dashboard_url: SafeResourceUrl;
  from: string = "now-1d";
  to: string = "now";
  maxDate = new Date();
  dateRange = {begin: new Date(), end: new Date()};
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private clientService: ClientService
  ) { 
  }

  ngOnInit(): void {
    this.getClient();
    this.loadDashboard();
  }

  getClient(){
    let id = this.router.url.split("/")[2];
    this.client = this.clientService.getClient(id);
  }

  loadDashboard(){
    this.transactions_dashboard_url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://${this.client.id}${environment.production ? '' : 'dev'}-elasticsearch.omnixsystem.com/s/${environment.production ? 'production' : 'development'}${this.getTransactionDashboardPath(this.from,this.to)}`);
  }

  getTransactionDashboardPath (to,from){
    return `/app/kibana?#/dashboard/${this.client.dashboards.transactions.id}?embed=true&_g=`+encodeURIComponent(`(refreshInterval:(pause:!t,value:0),time:(from:'${this.from}',to:'${this.to}'))`);
  }

  onDateChangeEvent(event,piker){
    if(piker === 'start'){
      let begin = new Date(event.value);
      begin.setHours(0,0,0,0);
      this.from = new Date(begin.getTime()-(begin.getTimezoneOffset()*60000)).toISOString();
    }else{
      let end = new Date(event.value);
      end.setHours(23,59,59,999);
      this.to = new Date(end.getTime()-(end.getTimezoneOffset()*60000)).toISOString();
    }
  }

  onRefreshButton(){
    this.loadDashboard()
  }

}
