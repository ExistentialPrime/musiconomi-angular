import { Component, OnInit } from '@angular/core';

import { Coin }        from './coin';
import { CoinService } from './coin.service';

@Component({
  selector: 'pay-with-btc',
  templateUrl: './pay-with-btc.component.html'
})
export class PayWithBtcComponent implements OnInit {
  
   // Properties
  paypalEmail: string;
  paypalAmount: number;
  paypalCost: number;
  
  // Constructor
  constructor() { }
  
  // Init
  ngOnInit(): void {
   
  }

  // Custom functions
  clearPaypalFields() {
      this.paypalEmail = "";
      this.paypalAmount = 0;
      this.paypalCost = 0;
  }

}
