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
require('./rxjs-extensions');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var search_tracks_component_1 = require('./component/search-tracks.component');
var friends_component_1 = require('./component/friends.component');
var my_tracks_component_1 = require('./component/my-tracks.component');
var router_1 = require("@angular/router");
var track_service_1 = require('./service/track.service');
var auth_service_1 = require('./service/auth.service');
var user_service_1 = require('./service/user.service');
var player_service_1 = require('./service/player.service');
var cookies_service_1 = require('angular2-cookie/services/cookies.service');
var http_1 = require('@angular/http');
var angular2_infinite_scroll_1 = require('angular2-infinite-scroll');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                angular2_infinite_scroll_1.InfiniteScrollModule,
                router_1.RouterModule.forRoot([
                    {
                        path: '',
                        component: my_tracks_component_1.MyTracksComponent
                    },
                    {
                        path: 'tracks',
                        component: my_tracks_component_1.MyTracksComponent
                    },
                    {
                        path: 'search',
                        component: search_tracks_component_1.SearchTracksComponent
                    },
                    {
                        path: 'friends',
                        component: friends_component_1.FriendsComponent
                    },
                    {
                        path: 'my-tracks',
                        component: my_tracks_component_1.MyTracksComponent
                    }
                ])
            ],
            declarations: [
                app_component_1.AppComponent,
                search_tracks_component_1.SearchTracksComponent,
                friends_component_1.FriendsComponent,
                my_tracks_component_1.MyTracksComponent
            ],
            providers: [
                track_service_1.TrackService,
                auth_service_1.AuthService,
                user_service_1.UserService,
                player_service_1.PlayerService,
                cookies_service_1.CookieService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map