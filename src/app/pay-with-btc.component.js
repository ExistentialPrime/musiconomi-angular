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
var PayWithBtcComponent = (function () {
    // Constructor
    function PayWithBtcComponent(coinService, router) {
        this.coinService = coinService;
        this.router = router;
    }
    Object.defineProperty(PayWithBtcComponent.prototype, "selectedAmount", {
        get: function () { return this._selectedAmount; },
        set: function (val) {
            this._selectedAmount = val;
            this.selectAmount();
            this.calculateCost(); //this.btcCost = Math.round( this.mcToReceive * this.mcPriceBtc * 1000000) / 10000000; // round t o7 decimal places
        },
        enumerable: true,
        configurable: true
    });
    // Init
    PayWithBtcComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Set initial values
        this.selectedAmount = "1000"; // Set initial selection to '1000'
        this.isManualAmountEnabled = false; // Turn off manual coin amount entry until OTHER is selected
        this.btcCost = 0;
        // Get latest BTC and MC prices    
        this.coinService.fetchCurrentBTCPriceSlowly().then(function (rslt) { return _this.btcPriceUsd = rslt; });
        this.coinService.fetchCurrentMCPriceSlowly().then(function (rslt) { return _this.mcPriceBtc = rslt; }).then(function (done) { return _this.calculateCost(); });
        // Get Transactions for display on left side (look into making this a global component)
        this.coinService.getAllTransactions("userId=12345").then(function (rslt) { return _this.populateTransactions(rslt); });
    };
    // Amount radio button selection handling (fired after the this.selectedAmount variable is bound, so we can use it)
    PayWithBtcComponent.prototype.selectAmount = function () {
        // If OTHER is selected, unlock the ToRecieve box for manual editing
        if (this.selectedAmount == "other") {
            this.mcToReceive = 10000;
            this.isManualAmountEnabled = true;
        }
        else {
            this.mcToReceive = parseFloat(this.selectedAmount);
            this.isManualAmountEnabled = false;
        }
    };
    PayWithBtcComponent.prototype.calculateCost = function () {
        this.btcCost = Math.round(this.mcToReceive * this.mcPriceBtc * 1000000) / 1000000; // round to 7 decimal places
    };
    PayWithBtcComponent.prototype.populateTransactions = function (allTxs) {
        this.pendingTransactions = allTxs;
    };
    PayWithBtcComponent.prototype.gotoTxDetail = function (internalId) {
        this.router.navigate(['/transaction', internalId]);
    };
    return PayWithBtcComponent;
}());
PayWithBtcComponent = __decorate([
    core_1.Component({
        selector: 'pay-with-btc',
        templateUrl: './pay-with-btc.component.html'
    }),
    __metadata("design:paramtypes", [coin_service_1.CoinService,
        router_1.Router])
], PayWithBtcComponent);
exports.PayWithBtcComponent = PayWithBtcComponent;
//# sourceMappingURL=pay-with-btc.component.js.map