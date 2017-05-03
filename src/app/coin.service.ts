import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Coin } from './Coin';

@Injectable()
export class CoinService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private CoinsUrl = 'api/coins';  // URL to web api

  constructor(private http: Http) { }

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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

