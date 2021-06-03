import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  SimpleChanges,
  OnChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { VTransaction } from '../../model/vtransaction.model';
import { plainToClass } from 'class-transformer';
import ExistingTransaction from '../../content/json/existingTransactions.json';
import { Transaction } from 'src/app/model/transaction.model';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css'],
})
export class ViewTransactionsComponent
  implements AfterViewInit, OnInit, OnChanges
{
  transactionJson: any = ExistingTransaction;
  transactions!: Array<VTransaction>;
  viewT!: VTransaction;
  dataSource: any;
  count!: string;
  ref!: string;
  displayedColumns: string[] = ['name', 'amount', 'currency', 'reference'];

  @Input()
  newTransaction!: Transaction;

  @ViewChild(MatSort) sort: MatSort | undefined;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor() {}
  ngOnInit(): void {
    this.transactions = plainToClass(VTransaction, this.transactionJson as []);
    this.dataSource = new MatTableDataSource<VTransaction>(this.transactions);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.newTransaction.firstChange) {
      const transaction = changes.newTransaction.currentValue;
      const last = this.transactions[
        this.transactions.length - 1
      ].reference.substr(11, 14);
      const calc = Number(last) + 1;
      this.count = this.pad(calc, 3);
      const myDate = new Date();
      this.ref =
        'CUS' +
        myDate.getFullYear() +
        this.pad(myDate.getMonth(), 2) +
        this.pad(myDate.getDate(), 2) +
        this.count;

      this.viewT = new VTransaction(
        transaction.customer.name,
        transaction.amount,
        transaction.currency,
        this.ref
      );

      this.transactions.push(this.viewT);
      this.dataSource.data = this.transactions;
    }
    /*  */
  }

  pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }
}
