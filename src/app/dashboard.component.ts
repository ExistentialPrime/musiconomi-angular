import { Component, OnInit } from '@angular/core';

import { Coin }        from './coin';
import { CoinService } from './coin.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  coins: Coin[] = [];

  constructor(private coinService: CoinService) { }

  ngOnInit(): void {
    // do service stuff on init
    this.coinService.getCoins().then(coinsReturned => this.coins = coinsReturned.slice(1, 4)); // only grab the first 3 coins
  }
}
