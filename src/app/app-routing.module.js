"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var pay_with_btc_component_1 = require("./pay-with-btc.component");
var pay_with_fiat_component_1 = require("./pay-with-fiat.component");
var coins_component_1 = require("./coins.component");
var coin_detail_component_1 = require("./coin-detail.component");
var routes = [
    { path: '', redirectTo: '/pay-with-btc', pathMatch: 'full' },
    { path: 'pay-with-btc', component: pay_with_btc_component_1.PayWithBtcComponent },
    { path: 'pay-with-fiat', component: pay_with_fiat_component_1.PayWithFiatComponent },
    { path: 'detail/:id', component: coin_detail_component_1.CoinDetailComponent },
    { path: 'coins', component: coins_component_1.CoinsComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map