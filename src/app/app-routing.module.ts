import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PayWithBtcComponent }   from './pay-with-btc.component';
import { PayWithFiatComponent }   from './pay-with-fiat.component';
import { CoinsComponent }      from './coins.component';
import { TransactionDetailComponent }  from './transaction.component';

const routes: Routes = [
  { path: '', redirectTo: '/pay-with-fiat', pathMatch: 'full' },
  { path: 'pay-with-btc',  component: PayWithBtcComponent },
  { path: 'pay-with-fiat',  component: PayWithFiatComponent },
  { path: 'transaction/:id', component: TransactionDetailComponent },
  { path: 'coins',     component: CoinsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
