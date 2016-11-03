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
var user_service_1 = require("../service/user.service");
var track_service_1 = require("../service/track.service");
var player_service_1 = require("../service/player.service");
var FriendsComponent = (function () {
    function FriendsComponent(userService, trackService, playerService) {
        this.userService = userService;
        this.trackService = trackService;
        this.playerService = playerService;
        this.friends = [];
        this.count = 30;
        this.offset = 0;
        this.isOver = false;
    }
    FriendsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getFriends(this.count, this.offset).then(function (users) { return _this.friends = users; });
        this.offset += this.count;
    };
    FriendsComponent.prototype.onScrollDown = function () {
        var _this = this;
        if (!this.isOver) {
            this.userService.getFriends(this.count, this.offset).then(function (users) {
                _this.addAll(users);
                if (users.length > 0 && users.length >= _this.count) {
                    _this.offset += _this.count;
                }
                else {
                    _this.isOver = true;
                }
            });
        }
    };
    FriendsComponent.prototype.onSelect = function (friend) {
        var _this = this;
        this.selectedFriend = friend;
        this.trackService.getFriendTracks(30, 0, friend.userId).then(function (tracks) { return _this.playerService.fillPlayer(tracks); });
    };
    FriendsComponent.prototype.addAll = function (newFriends) {
        for (var i = 0; i < newFriends.length; i++) {
            this.friends.push(newFriends[i]);
        }
    };
    FriendsComponent = __decorate([
        core_1.Component({
            selector: "friends",
            templateUrl: "app/component/friends.component.html",
            styleUrls: ["assets/css/player.css"]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, track_service_1.TrackService, player_service_1.PlayerService])
    ], FriendsComponent);
    return FriendsComponent;
}());
exports.FriendsComponent = FriendsComponent;
//# sourceMappingURL=friends.component.js.map