import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { CoinService } from './coin.service';

import { Transaction } from './transaction';

@Component({
  selector: 'pay-with-btc',
  templateUrl: './pay-with-btc.component.html'
})
export class PayWithBtcComponent implements OnInit {

   // Properties
  btcPaymentAddress: string;        // The BTC address the user should send funds to
  mcToReceive: number;              // The amount of Musicoin the user will receive from this purchase
  btcCost: number;                  // The cost (in BTC) of this purchase
  isManualAmountEnabled: boolean;   // Allow manual entry of amount to purchase (only allow when OTHER is selected)
  btcPriceUsd: number;              // Current price of BTC in USD
  mcPriceBtc: number;               // current price of MC in BTC
  mcPriceUsd: number;               // Current price of MC in USD
  
  // Custgom on-change handler for 'selectedAmount' to handle calculations every time it changes
  _selectedAmount: any;              // Currently selected amount (radio button group)
  set selectedAmount(val: any) {     // Handle the onchange events
      this._selectedAmount = val;
      this.selectAmount();
      this.calculateCost();
  }
  get selectedAmount(): any { return this._selectedAmount; }
  
  pendingTransactions: Transaction[];
  previousTransactions: Transaction[];


  // Constructor
  constructor(
    private coinService: CoinService,
    private router: Router
  ) { }
  
  // Init
  ngOnInit(): void {
    // Set initial values
    this.selectedAmount = "1000"; // Set initial selection to '1000'
    this.isManualAmountEnabled = false; // Turn off manual coin amount entry until OTHER is selected
    this.btcCost = 0;

    // Get latest BTC and MC prices    
    this.coinService.fetchCurrentBTCPriceSlowly().then(rslt => this.btcPriceUsd = rslt);
    this.coinService.fetchCurrentMCPriceSlowly().then(rslt => this.mcPriceBtc = rslt).then(done => this.calculateCost());

    // Get Transactions for display on left side (look into making this a global component)
    this.coinService.getAllTransactions("userId=12345").then(rslt => this.populateTransactions(rslt));
  }

  // Amount radio button selection handling (fired after the this.selectedAmount variable is bound, so we can use it)
  selectAmount() {
    if (this.selectedAmount === "other") { this.mcToReceive = 10000; this.isManualAmountEnabled = true; } // If OTHER is selected, unlock the ToRecieve box for manual editing
    else { this.mcToReceive = parseFloat(this.selectedAmount); this.isManualAmountEnabled = false; } // Else just set to the value selected
  }

  calculateCost() {
      this.btcCost = Math.round( this.mcToReceive * this.mcPriceBtc * 1000000) / 1000000; // round to 7 decimal places
   }

   populateTransactions(allTxs: Transaction[]) {
     this.pendingTransactions = allTxs;
     this.previousTransactions = allTxs;
   }

  gotoTxDetail(internalId: string): void {
    this.router.navigate(['/transaction', internalId]);
  }

}
