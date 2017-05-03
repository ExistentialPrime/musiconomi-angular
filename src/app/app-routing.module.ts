import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { PayWithFiatComponent }   from './pay-with-fiat.component';
import { CoinsComponent }      from './coins.component';
import { CoinDetailComponent }  from './coin-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/pay-with-fiat', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'pay-with-fiat',  component: PayWithFiatComponent }, 
  { path: 'detail/:id', component: CoinDetailComponent },
  { path: 'coins',     component: CoinsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
