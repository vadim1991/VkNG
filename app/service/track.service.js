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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var track_1 = require("../model/track");
var auth_service_1 = require('./auth.service');
var URL = "https://api.vk.com/method/audio.get?callback=JSONP_CALLBACK";
var TrackService = (function () {
    function TrackService(jsonp, authService) {
        this.jsonp = jsonp;
        this.authService = authService;
    }
    TrackService.prototype.getFriendTracks = function (count, offset, friendId) {
        return this.getTracks(count, offset, friendId);
    };
    TrackService.prototype.getOwnTracks = function (count, offset) {
        return this.getTracks(count, offset, this.authService.getUserId());
    };
    TrackService.prototype.getTracks = function (count, offset, userId) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('access_token', this.authService.getAccessToken());
        params.set('owner_id', userId);
        params.set('count', count.toString());
        params.set('offset', offset.toString());
        return this.jsonp.get(URL, { search: params })
            .map(function (res) { return res.json().response; })
            .map(function (tracks) {
            return _this.parseTracks(tracks);
        })
            .toPromise();
    };
    TrackService.prototype.parseTracks = function (items) {
        var tracks = [];
        for (var i = 1; i < items.length; i++) {
            tracks.push(new track_1.Track(items[i]));
        }
        return tracks;
    };
    TrackService.prototype.handleResponse = function (result) {
        console.log(result);
        return result;
    };
    TrackService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Jsonp, auth_service_1.AuthService])
    ], TrackService);
    return TrackService;
}());
exports.TrackService = TrackService;
//# sourceMappingURL=track.service.js.map