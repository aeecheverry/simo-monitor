import { Component, OnInit, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { state, trigger, style, transition, animate } from '@angular/animations';
import { merge } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TransactionsTableComponent implements OnInit, AfterViewInit, OnChanges {
  
  @Input() params: TransactionInputAPI;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource();
  columnsToDisplay: string[] = ['date', 'id', 'succeed'];
  expandedElement: Transaction | null;
  
  pageSizeOptions: number[] = [10, 25, 50];
  selectedTransaction: Transaction;

  editorOptions = {theme: 'vs', language: 'json', readOnly:true};

  resultsLength = 1000;
  isLoadingResults: boolean = true;
  isRateLimitReached: boolean = false;

  constructor(
    private transactionsService: TransactionService
  ) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.listTransactions();
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  setSortBy(params, sort, order){
    if(sort){
      params.sortBy = {
        [sort]:order
      }
    }
  }

  ngAfterViewInit() {
    //this.listTransactions();
  }
  
  listTransactions(){
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          console.log()
          this.isLoadingResults = true;
          this.setSortBy(this.params,this.sort.active,this.sort.direction)
          return this.transactionsService.listTransactions(this.params);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total;
          return data.records;
        }),
        catchError((error) => {
          console.log("Error"+error);
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return of([]);
        })
      ).subscribe(data => this.dataSource = new MatTableDataSource<Transaction>(data));
  } 

  onClickRow(transaction){
    this.selectedTransaction = transaction;
  }

  parse(object){
    let parsed;
    try{
      parsed = JSON.parse(object);
    }catch(error){
      parsed = object
    }
    return parsed;
  }

  stringifyForEditor(object){
    return JSON.stringify(this.parse(object), null, 2)
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
