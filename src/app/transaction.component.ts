import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Transaction } from './transaction';
import { CoinService } from './coin.service';

@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html'
})
export class TransactionDetailComponent implements OnInit {
  
  // Properties
  transaction: Transaction;

  // Constructor
  constructor(      
    private coinService: CoinService,
    private route: ActivatedRoute,
    private location: Location
  ) { }
  
  // Init
  ngOnInit(): void {
    // Get values for the specified transaction
    this.route.params
      .switchMap((params: Params) => this.coinService.getTransaction(+params['id']))
      .subscribe(tx => this.transaction = tx);
    
  }

  
  goBack(): void {
    this.location.back();
  }


}