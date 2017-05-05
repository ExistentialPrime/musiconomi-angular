import { Component, OnInit } from '@angular/core';

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
  
  _selectedAmount: any;              // Currently selected amount (radio button group)
  set selectedAmount(val: any) {     // Handle the onchange events
      this._selectedAmount = val;
      this.selectAmount();
  }
  get selectedAmount(): any { return this._selectedAmount; }

  // Constructor
  constructor() {
    
   }
  
  // Init
  ngOnInit(): void {
    this.selectedAmount = "1000"; // Set initial selection to '1000'
    this.isManualAmountEnabled = false; // Turn off manual coin amount entry until OTHER is selected
  }

  // Amount radio button selection handling (fired after the this.selectedAmount variable is bound, so we can use it)
  selectAmount() {
    // If OTHER is selected, unlock the ToRecieve box for manual editing
    if (this.selectedAmount == "other") { this.mcToReceive = 10000; this.isManualAmountEnabled = true; }
    // Else just set to the value selected
    else { this.mcToReceive = parseFloat(this.selectedAmount); this.isManualAmountEnabled = false; } 
  }



}
