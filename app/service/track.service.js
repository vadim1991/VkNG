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
var GET_AUDIO_URL = "https://api.vk.com/dev/audio.get?callback=JSONP_CALLBACK&v=5.60";
var SEARCH_AUDIO_URL = "https://api.vk.com/dev/audio.search?callback=JSONP_CALLBACK&v=5.60";
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
    TrackService.prototype.searchTracks = function (count, offset, searchText) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('access_token', this.authService.getAccessToken());
        params.set('q', searchText);
        params.set('count', count.toString());
        params.set('offset', offset.toString());
        params.set('auto_complete', "1");
        params.set('performer_only', "1");
        params.set('sort', "1");
        params.set('search_own', "1");
        return this.jsonp.get(SEARCH_AUDIO_URL, { search: params })
            .map(function (res) { return res.json().response; })
            .map(function (tracks) {
            return _this.parseTracks(tracks.items);
        })
            .toPromise();
    };
    TrackService.prototype.getTracks = function (count, offset, userId) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('access_token', this.authService.getAccessToken());
        params.set('owner_id', userId);
        params.set('need_user', "0");
        params.set('count', count.toString());
        params.set('offset', offset.toString());
        return this.jsonp.get(GET_AUDIO_URL, { search: params })
            .map(function (res) { return res.json().response; })
            .map(function (tracks) {
            console.log(tracks);
            return _this.parseTracks(tracks.items);
        })
            .toPromise();
    };
    TrackService.prototype.parseTracks = function (items) {
        var tracks = [];
        if (items) {
            for (var i = 0; i < items.length; i++) {
                tracks.push(new track_1.Track(items[i]));
            }
        }
        return tracks;
    };
    TrackService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Jsonp, auth_service_1.AuthService])
    ], TrackService);
    return TrackService;
}());
exports.TrackService = TrackService;
//# sourceMappingURL=track.service.js.map