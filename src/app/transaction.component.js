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
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var coin_service_1 = require("./coin.service");
var TransactionDetailComponent = (function () {
    // Constructor
    function TransactionDetailComponent(coinService, route, location) {
        this.coinService = coinService;
        this.route = route;
        this.location = location;
    }
    // Init
    TransactionDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Get values for the specified transaction
        this.route.params
            .switchMap(function (params) { return _this.coinService.getTransaction(+params['id']); })
            .subscribe(function (tx) { return _this.transaction = tx; });
    };
    TransactionDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    return TransactionDetailComponent;
}());
TransactionDetailComponent = __decorate([
    core_1.Component({
        selector: 'transaction',
        templateUrl: './transaction.component.html'
    }),
    __metadata("design:paramtypes", [coin_service_1.CoinService,
        router_1.ActivatedRoute,
        common_1.Location])
], TransactionDetailComponent);
exports.TransactionDetailComponent = TransactionDetailComponent;
//# sourceMappingURL=transaction.component.js.map