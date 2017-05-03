import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pay-with-fiat',
  templateUrl: './pay-with-fiat.component.html'
})
export class PayWithFiatComponent implements OnInit {
  
  // Properties
  paypalEmail: string;
  paypalAmount: number;
  paypalCost: number;

  // Constructors
  constructor() { }

  // Initialization
  ngOnInit(): void {

    
  }

  
  submitted = false;

  onSubmit() { this.submitted = true; }

  // Custom functions
  clearPaypalFields() {
      this.paypalEmail = "";
      this.paypalAmount = 0;
      this.paypalCost = 0;
  }
  


}