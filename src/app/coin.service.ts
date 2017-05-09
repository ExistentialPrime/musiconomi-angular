import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Coin } from './Coin';
import { Transaction } from './transaction';

@Injectable()
export class CoinService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private CoinsUrl = 'api/coins';  // URL to web api
  private TransactionUrl = 'api/transactions';

  constructor(private http: Http) { }


  /* Currency price fetching */
  /* ------------------------------------------------ */
  // Get the current price of BTC in USD
  fetchCurrentBTCPrice(): Promise<number> {
      return this.http.get('api/btcPrice')
               .toPromise()
               .then(response => response.json().data as number)
               .catch(this.handleError);
  }
  fetchCurrentBTCPriceSlowly(): Promise<number> {
      return new Promise(resolve => {
        // Simulate server latency with 1.0 second delay
        setTimeout(() => resolve(this.fetchCurrentBTCPrice()), 1000);
      });
  }

  // Get the current price of Musicoin (in bitcoin)
  fetchCurrentMCPrice(): Promise<number> {
      return this.http.get('api/mcPrice')
               .toPromise()
               .then(response => response.json().data as number)
               .catch(this.handleError);
  }

  fetchCurrentMCPriceSlowly(): Promise<number> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.fetchCurrentMCPrice()), 2000);
    });
  }


  /* Transaction Services */
  /* ------------------------------------------------ */
  getAllTransactions(userID: string): Promise<Transaction[]> {
    return this.http.get(this.TransactionUrl) // + userID')
               .toPromise()
               .then(response => response.json().data as Transaction[])
               .catch(this.handleError);

  }
  getTransaction(id: number): Promise<Transaction> {
    const url = `${this.TransactionUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Transaction)
      .catch(this.handleError);
  }



  /* Example 'Coin' API calls  from Tutorial - REMOVE THIS!!!*/
  /* --------------------------------------------------- */
  getCoins(): Promise<Coin[]> {
    return this.http.get(this.CoinsUrl)
               .toPromise()
               .then(response => response.json().data as Coin[])
               .catch(this.handleError);
  }


  getCoin(id: number): Promise<Coin> {
    const url = `${this.CoinsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Coin)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.CoinsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Coin> {
    return this.http
      .post(this.CoinsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Coin)
      .catch(this.handleError);
  }

  update(Coin: Coin): Promise<Coin> {
    const url = `${this.CoinsUrl}/${Coin.id}`;
    return this.http
      .put(url, JSON.stringify(Coin), {headers: this.headers})
      .toPromise()
      .then(() => Coin)
      .catch(this.handleError);
  }


/* Utility functions */
/* ------------------------------------------------------- */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }




} // End class

