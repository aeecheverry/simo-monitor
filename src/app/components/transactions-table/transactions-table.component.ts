import { Component, OnInit, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Transaction } from '../../models/trasnaction';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})

export class TransactionsTableComponent implements OnInit {

  @Input() transactions: Transaction[];
  @Input() total: number;
  @Input() loading: boolean;
  @Output() page: EventEmitter<PageEvent> = new EventEmitter();

  dataSource = new MatTableDataSource();
  columnsToDisplay: string[] = ['date', 'id', 'succeed'];
  expandedElement: Transaction | null;
  length: number = 0;
  pageSizeOptions: number[] = [10, 25, 50];
  selectedTransaction: Transaction;

  editorOptions = {theme: 'vs', language: 'json', readOnly:true};

  isLoadingResults: boolean = this.loading;
  isRateLimitReached: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  onPageFired(event){
    this.isLoadingResults = this.loading;
    this.page.emit(event);
  }
  
  
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<Transaction>(this.transactions);
    this.length = this.total;
    this.isLoadingResults = this.loading;
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
