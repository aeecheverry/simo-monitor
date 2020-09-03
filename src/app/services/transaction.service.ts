import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()

export class TransactionService {
    constructor(
        private http: HttpClient
    ) {}

    listServices(data: ListServicesInputAPI) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const options = { headers: headers };
        return this.http.post<any>(
            environment.apiHost + environment.path_transactions_list_services, data, options
        ).pipe(map(data => {
            let services = data.message;
            services = services.map(service=> service.key);
            return services;
        }));
    }

    listTransactions(data: ListTransactionInputAPI) : Observable<ListTransactionsResult> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const options = { headers: headers };
        return this.http.post<ListTransactionOutputAPI>(
            environment.apiHost + environment.path_transactions_list, data, options
        ).pipe(map(data => {
            let transactions: ListTransactionsResult = data.message;
            transactions.records = transactions.records.map(transaction => transaction._source);
            return transactions;
        }));
    }

}

export interface ListTransactionInputAPI {
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

export interface ListServicesInputAPI {
    queryString: string,
    filters: object,
    projection:string[],
    from: string,
    to: string,
    servicesLimit: number,
    clientId: string
}

export interface ListTransactionOutputAPI {
    code:number,
    message: {
        size: number,
        from: number,
        pages: number,
        total: number,
        records: any[]
    }
}

export interface ListTransactionsResult {
    size: number,
    from: number,
    pages: number,
    total: number,
    records: any[]
}

export interface ListServiceResult {
    key:string, 
    doc_count: number;
}
