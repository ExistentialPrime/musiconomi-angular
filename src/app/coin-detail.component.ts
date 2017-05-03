import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Coin }        from './coin';
import { CoinService } from './coin.service';

@Component({
  selector: 'coin-detail',
  templateUrl: './coin-detail.component.html'
})
export class CoinDetailComponent implements OnInit {
  coin: Coin;

  constructor(
    private coinService: CoinService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.coinService.getCoin(+params['id']))
      .subscribe(coin => this.coin = coin);
  }

  save(): void {
    this.coinService.update(this.coin)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
