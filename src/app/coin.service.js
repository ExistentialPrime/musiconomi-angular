"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var CoinService = (function () {
    function CoinService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.CoinsUrl = 'api/coins'; // URL to web api
        this.TransactionUrl = 'api/transactions';
    }
    /* Currency price fetching */
    /* ------------------------------------------------ */
    // Get the current price of BTC in USD
    CoinService.prototype.fetchCurrentBTCPrice = function () {
        return this.http.get('api/btcPrice')
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    CoinService.prototype.fetchCurrentBTCPriceSlowly = function () {
        var _this = this;
        return new Promise(function (resolve) {
            // Simulate server latency with 1.0 second delay
            setTimeout(function () { return resolve(_this.fetchCurrentBTCPrice()); }, 1000);
        });
    };
    // Get the current price of Musicoin (in bitcoin)
    CoinService.prototype.fetchCurrentMCPrice = function () {
        return this.http.get('api/mcPrice')
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    CoinService.prototype.fetchCurrentMCPriceSlowly = function () {
        var _this = this;
        return new Promise(function (resolve) {
            // Simulate server latency with 2 second delay
            setTimeout(function () { return resolve(_this.fetchCurrentMCPrice()); }, 2000);
        });
    };
    /* Transaction Services */
    /* ------------------------------------------------ */
    CoinService.prototype.getAllTransactions = function (userID) {
        return this.http.get(this.TransactionUrl) // + userID')
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    CoinService.prototype.getTransaction = function (id) {
        var url = this.TransactionUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    /* Example 'Coin' API calls  from Tutorial - REMOVE THIS!!!*/
    /* --------------------------------------------------- */
    CoinService.prototype.getCoins = function () {
        return this.http.get(this.CoinsUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    CoinService.prototype.getCoin = function (id) {
        var url = this.CoinsUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    CoinService.prototype.delete = function (id) {
        var url = this.CoinsUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    CoinService.prototype.create = function (name) {
        return this.http
            .post(this.CoinsUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    CoinService.prototype.update = function (Coin) {
        var url = this.CoinsUrl + "/" + Coin.id;
        return this.http
            .put(url, JSON.stringify(Coin), { headers: this.headers })
            .toPromise()
            .then(function () { return Coin; })
            .catch(this.handleError);
    };
    /* Utility functions */
    /* ------------------------------------------------------- */
    CoinService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return CoinService;
}()); // End class
CoinService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CoinService);
exports.CoinService = CoinService;
//# sourceMappingURL=coin.service.js.map