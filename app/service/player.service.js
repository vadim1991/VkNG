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
var track_service_1 = require("./track.service");
var COUNT_DEFAULT = 20;
var OFFSET_DEFAULT = 0;
var MY_TRACKS_OPERATION = "my-tracks";
var FRIEND_TRACKS_OPERATION = "friend-tracks";
var SEARCH_TRACKS_OPERATION = "search";
var PlayerService = (function () {
    function PlayerService(trackService) {
        this.trackService = trackService;
        this.count = COUNT_DEFAULT;
        this.offset = OFFSET_DEFAULT;
        this.hasMore = true;
        this.initPlayer();
        jPlayerPlus();
    }
    PlayerService.prototype.loadMyTracks = function () {
        var _this = this;
        if (MY_TRACKS_OPERATION != this.prevOperation) {
            this.resetCountAndSetOperation(MY_TRACKS_OPERATION);
            this.trackService.getOwnTracks(this.count, this.offset).then(function (tracks) { return _this.fillPlayer(tracks); });
        }
        this.prevOperation = MY_TRACKS_OPERATION;
    };
    PlayerService.prototype.loadFriendTracks = function (friendId) {
        var _this = this;
        this.resetCountAndSetOperation(FRIEND_TRACKS_OPERATION);
        this.offset = OFFSET_DEFAULT;
        this.friendId = friendId;
        this.trackService.getFriendTracks(this.count, this.offset, this.friendId).then(function (tracks) { return _this.fillPlayer(tracks); });
    };
    PlayerService.prototype.searchTracks = function (searchText) {
        var _this = this;
        this.resetCountAndSetOperation(SEARCH_TRACKS_OPERATION);
        this.offset = OFFSET_DEFAULT;
        this.searchText = searchText;
        this.trackService.searchTracks(this.count, this.offset, searchText).then(function (tracks) { return _this.fillPlayer(tracks); });
    };
    PlayerService.prototype.loadMoreMyTracks = function () {
        var _this = this;
        if (this.hasMore) {
            this.offset += this.count;
            this.trackService.getOwnTracks(this.count, this.offset).then(function (tracks) {
                console.log(tracks);
                _this.addTracks(tracks);
                _this.hasMore = tracks.length >= _this.count;
                console.log(_this.hasMore);
            });
        }
    };
    PlayerService.prototype.loadMoreFriendTracks = function () {
        var _this = this;
        if (this.hasMore) {
            this.offset += this.count;
            this.trackService.getFriendTracks(this.count, this.offset, this.friendId).then(function (tracks) {
                _this.addTracks(tracks);
                _this.hasMore = tracks.length >= _this.count;
            });
        }
    };
    PlayerService.prototype.loadMoreSearchTracks = function () {
        var _this = this;
        if (this.hasMore) {
            this.offset += this.count;
            this.trackService.getFriendTracks(this.count, this.offset, this.searchText).then(function (tracks) {
                _this.addTracks(tracks);
                _this.hasMore = tracks.length >= _this.count;
            });
        }
    };
    PlayerService.prototype.loadMore = function () {
        switch (this.prevOperation) {
            case MY_TRACKS_OPERATION:
                this.loadMoreMyTracks();
                break;
            case FRIEND_TRACKS_OPERATION:
                this.loadMoreFriendTracks();
                break;
            case SEARCH_TRACKS_OPERATION:
                this.loadMoreSearchTracks();
                break;
            default: console.log("load more unknown track operation");
        }
    };
    PlayerService.prototype.fillPlayer = function (tracks) {
        this.playlist.setPlaylist(tracks);
        setTimeout(function () {
            jPlayerPlus();
        }, 1000);
    };
    PlayerService.prototype.addTracks = function (tracks) {
        for (var i = 1; i < tracks.length; i++) {
            this.playlist.add(tracks[i]);
        }
        setTimeout(function () {
            jPlayerPlus();
        }, 1000);
    };
    PlayerService.prototype.resetCountAndSetOperation = function (operation) {
        this.offset = OFFSET_DEFAULT;
        this.prevOperation = operation;
        this.hasMore = true;
    };
    PlayerService.prototype.initPlayer = function () {
        this.playlist = new jPlayerPlaylist({
            jPlayer: "#jquery_jplayer_1",
            cssSelectorAncestor: "#jp_container_1"
        }, [], {
            playlistOptions: {
                enableRemoveControls: true
            },
            swfPath: "./assets/js/jplayer/",
            supplied: "mp3",
            smoothPlayBar: true,
            audioFullScreen: true
        });
    };
    PlayerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [track_service_1.TrackService])
    ], PlayerService);
    return PlayerService;
}());
exports.PlayerService = PlayerService;
//# sourceMappingURL=player.service.js.map