import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Transaction } from './transaction';
import { CoinService } from './coin.service';

@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html'
})
export class TransactionDetailComponent implements OnInit {
  
  // Properties
  transaction: Transaction;                 // Current Transaction to View
  pendingTransactions: Transaction[];       // List of all Pending Transactions for right side bar
  previousTransactions: Transaction[];      // List of all other Transactions for right side bar

  // Constructor
  constructor(      
    private coinService: CoinService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }
  
  // Init
  ngOnInit(): void {
    // Get values for the specified transaction
    this.route.params
      .switchMap((params: Params) => this.coinService.getTransaction(params['id']))
      .subscribe(tx => this.transaction = tx);
    
    // Get Transactions for display on left side (look into making this a global component)
    this.coinService.getAllTransactions("userId=12345").then(rslt => this.populateTransactions(rslt));
  }

  // Copied directly from pay-with-btc.component.ts. Should probably componentize this to prevent DRY
  populateTransactions(allTxs: Transaction[]) {
     this.pendingTransactions = allTxs.filter(function (tx) {  return tx.status === 'Pending';});
     this.previousTransactions  = allTxs.filter(function (tx) {  return tx.status != 'Pending';});
   }

  // Copied directly from pay-with-btc.component.ts. Should probably componentize this to prevent DRY
  gotoTxDetail(internalId: string): void {
    this.router.navigate(['/transaction', internalId]);
  }

  
  goBack(): void {
    this.location.back();
  }


}