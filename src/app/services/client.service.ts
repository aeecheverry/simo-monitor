import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../models/client';
import {environment} from '../../environments/environment';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class ClientService {
    private currentClientsSubject: BehaviorSubject<Client[]>;
    public currentClients: Observable<Client[]>;

    constructor( 
        private http: HttpClient
    ) { 
        this.currentClientsSubject = new BehaviorSubject<Client[]>(JSON.parse(localStorage.getItem('clients')));
        this.currentClients = this.currentClientsSubject.asObservable();
    }

    public get currentClientsValue(): Client[] {
        return this.currentClientsSubject.value;
    }

    getClients(): Observable<any> { 
        const path = environment.path_client_list;
        const clients_endpoint = environment.apiHost+path;
        return this.http.get<any>(clients_endpoint).pipe(map(clients => {
            //console.log('clients', JSON.stringify(clients,null,2))
            localStorage.setItem('clients', JSON.stringify(clients));
            this.currentClientsSubject.next(clients);
            return clients;
        }));
    } 

}