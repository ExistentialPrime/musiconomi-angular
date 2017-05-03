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
var router_1 = require("@angular/router");
var coin_service_1 = require("./coin.service");
var CoinsComponent = (function () {
    function CoinsComponent(coinService, router) {
        this.coinService = coinService;
        this.router = router;
    }
    CoinsComponent.prototype.getCoins = function () {
        var _this = this;
        this.coinService
            .getCoins()
            .then(function (coins) { return _this.coins = coins; });
    };
    CoinsComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.coinService.create(name)
            .then(function (coin) {
            _this.coins.push(coin);
            _this.selectedCoin = null;
        });
    };
    CoinsComponent.prototype.delete = function (coin) {
        var _this = this;
        this.coinService
            .delete(coin.id)
            .then(function () {
            _this.coins = _this.coins.filter(function (h) { return h !== coin; });
            if (_this.selectedCoin === coin) {
                _this.selectedCoin = null;
            }
        });
    };
    CoinsComponent.prototype.ngOnInit = function () {
        this.getCoins();
    };
    CoinsComponent.prototype.onSelect = function (coin) {
        this.selectedCoin = coin;
    };
    CoinsComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedCoin.id]);
    };
    return CoinsComponent;
}());
CoinsComponent = __decorate([
    core_1.Component({
        selector: 'my-coins',
        templateUrl: './coins.component.html',
        styleUrls: ['./coins.component.css']
    }),
    __metadata("design:paramtypes", [coin_service_1.CoinService,
        router_1.Router])
], CoinsComponent);
exports.CoinsComponent = CoinsComponent;
//# sourceMappingURL=coins.component.js.map