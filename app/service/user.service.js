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
var core_1 = require("@angular/core");
require('rxjs/add/operator/toPromise');
var auth_service_1 = require("./auth.service");
var http_1 = require('@angular/http');
var user_1 = require("../model/user");
var URL = "https://api.vk.com/method/friends.get?callback=JSONP_CALLBACK";
var FIELDS = "uid,first_name,last_name,nickname,screen_name,sex,photo_50";
var USER_ORDER = "hints";
var UserService = (function () {
    function UserService(jsonp, authService) {
        this.jsonp = jsonp;
        this.authService = authService;
    }
    UserService.prototype.getFriends = function (count, offset) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('access_token', this.authService.getAccessToken());
        params.set('user_id', this.authService.getUserId());
        params.set('order', USER_ORDER);
        params.set('fields', FIELDS);
        params.set('count', count.toString());
        params.set('offset', offset.toString());
        return this.jsonp.get(URL, { search: params })
            .map(function (res) { return res.json().response; })
            .map(function (users) {
            return _this.parseUsers(users);
        })
            .toPromise();
    };
    UserService.prototype.parseUsers = function (items) {
        var users = [];
        for (var i = 1; i < items.length; i++) {
            users.push(new user_1.User(items[i]));
        }
        return users;
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Jsonp, auth_service_1.AuthService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map