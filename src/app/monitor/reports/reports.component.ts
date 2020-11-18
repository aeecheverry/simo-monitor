import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { ReportService } from '../../services/report.service';
import {DomSanitizer} from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

import { Client } from 'src/app/models/client';
import moment from 'moment';

@Component({
	selector: 'app-reports',
	templateUrl: './reports.component.html',
	styleUrls: ['./reports.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class ReportsComponent implements OnInit {
    client: Client;
	from = moment().subtract(1, 'days').toISOString();
    to = moment().toISOString();
    reportList = [
        {from: "2020-11", to: "2020-12", type:"orders", url: "test", processed: true },
        {from: "2020-11", to: "2020-12", type:"orders", url: "test", processed: false }
    ];
    REPORTS_KEY = 'reports';


	constructor(
		private router: Router,
		private reportService: ReportService,
        private sanitizer: DomSanitizer,
        private clientService: ClientService
    ) {}

	ngOnInit() {
        this.getClient();
        this.getReportsFromLS();
        this.checkReportList();
		//this.overlayService.currentState.subscribe(state => this.overlay = state);
		//this.overlayService.changeState(false);
    }
    
    getClient(){
        let id = this.router.url.split("/")[2];
        this.client = this.clientService.getClient(id);
    }

    onDateChangeEvent(event,piker){
        if(piker === 'start'){
          let begin = new Date(event.value);
          begin.setHours(0,0,0,0);
          this.from = moment(begin.getTime()-(begin.getTimezoneOffset()*60000)).toISOString();
        }else{
          let end = new Date(event.value);
          end.setHours(23,59,59,999);
          this.to = moment(end.getTime()-(end.getTimezoneOffset()*60000)).toISOString();
        }
    }

	saveReportsToLS() {
        localStorage.setItem(this.REPORTS_KEY, JSON.stringify(this.reportList));
    }

	downloadFile(data: any) {
		let blob = new Blob([data], {type: 'text/csv' }),
		url = window.URL.createObjectURL(blob);
		return this.sanitizer.bypassSecurityTrustUrl(url);
	}

	generateReport() {
        //this.overlayService.changeState(true);
        let params = {
            from: this.from,
            to: this.to,
            type: "csv"
        };

        this.reportService.getReport(params).subscribe(
            data => {
                if (data.code === 200) {
                    let url = null;
                    if(params.type === 'csv'){
                        url = environment.reports_bucket_url+data.message;
                    }
                    this.reportList.push(Object.assign(params, { url: url, processed: false }));
                    this.checkReportList();
                    this.saveReportsToLS();
                } else {
                    console.log(data.code);
                    //this.openDialog('Pudo haber ocurrido un error, intenta nuevamente');
                }
                //this.overlayService.changeState(false);
            }, err => {
                console.log(err);
               /* 
                this.overlayService.changeState(false);
                this.openDialog('Ocurrió un error al intentar generar el reporte');
                */
            }
        )
    }

	deleteReport(index: number) {
        this.reportList.splice(index, 1);
        this.saveReportsToLS();
	}

    checkReportList(){
        for(const report of this.reportList){
            if(!report.processed){
                this.reportService.checkReport(report.url).subscribe(
                    data =>{
                        report.processed = true;
                        this.saveReportsToLS();
                    },
                    err =>{
                        report.processed = false;
                    }
                );
            }
        }
    }

	getReportsFromLS() {
        const ls = localStorage.getItem(this.REPORTS_KEY);
        try {
            if (ls) {
                const lsArr = JSON.parse(ls);
                this.reportList = lsArr;
            }
        } catch (e) {
            return false;
        }
    }
}
