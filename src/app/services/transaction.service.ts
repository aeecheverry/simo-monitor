import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable()

export class TransactionService {
    constructor(
        private http: HttpClient
    ) {}

    listServices(data: TransactionInputAPI) : Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const options = { headers: headers };
        return this.http.post<any>(
            environment.apiHost + environment.path_transactions_list_services, data, options
        ).pipe(map(services => {
            return services;
        }));
    }

    listTransactions(data: TransactionInputAPI) : Observable<TransactionsResult> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const options = { headers: headers };
        return this.http.post<ListTransactionOutputAPI>(
            environment.apiHost + environment.path_transactions_list, data, options
        ).pipe(map(data => {
            let transactions: TransactionsResult = data.message;
            transactions.records = transactions.records.map(transaction => transaction._source);
            return transactions;
        }));
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

export interface TransactionsResult {
    size: number,
    from: number,
    pages: number,
    total: number,
    records: any[]
}
