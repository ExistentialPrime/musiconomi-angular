import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Coin }                from './coin';
import { CoinService }         from './coin.service';

@Component({
  selector: 'my-coins',
  templateUrl: './coins.component.html',
  styleUrls: [ './coins.component.css' ]
})
export class CoinsComponent implements OnInit {
  coins: Coin[];
  selectedCoin: Coin;

  constructor(
    private coinService: CoinService,
    private router: Router) { }

  getCoins(): void {
    this.coinService
        .getCoins()
        .then(coins => this.coins = coins);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.coinService.create(name)
      .then(coin => {
        this.coins.push(coin);
        this.selectedCoin = null;
      });
  }

  delete(coin: Coin): void {
    this.coinService
        .delete(coin.id)
        .then(() => {
          this.coins = this.coins.filter(h => h !== coin);
          if (this.selectedCoin === coin) { this.selectedCoin = null; }
        });
  }

  ngOnInit(): void {
    this.getCoins();
  }

  onSelect(coin: Coin): void {
    this.selectedCoin = coin;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedCoin.id]);
  }
}
