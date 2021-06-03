import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/model/transaction.model';
import { VTransaction } from 'src/app/model/vtransaction.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  trans!: Transaction;
  ref!: VTransaction;
  transaction!: Transaction;



  getT($event: Transaction) {
    this.trans = $event;
    this.transaction = this.trans;
  }

  constructor(private router: Router) {}

  ngOnInit(): void {

  }



  logout() {
    this.router.navigate(['login']);
  }
}
