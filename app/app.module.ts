import './rxjs-extensions';
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {AppComponent}  from './app.component';
import {SearchTracksComponent} from './component/search-tracks.component';
import {FriendsComponent} from './component/friends.component';
import {MyTracksComponent} from './component/my-tracks.component';
import {RouterModule} from "@angular/router";
import {TrackService} from './service/track.service';
import {AuthService} from './service/auth.service';
import {UserService} from './service/user.service';
import {PlayerService} from './service/player.service';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {HttpModule, JsonpModule} from '@angular/http';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        InfiniteScrollModule,
        RouterModule.forRoot([
            {
                path: '',
                component: MyTracksComponent
            },
            {
                path: 'search',
                component: SearchTracksComponent
            },
            {
                path: 'friends',
                component: FriendsComponent
            },
            {
                path: 'my-tracks',
                component: MyTracksComponent
            }
        ])
    ],
    declarations: [
        AppComponent,
        SearchTracksComponent,
        FriendsComponent,
        MyTracksComponent
    ],
    providers: [
        TrackService,
        AuthService,
        UserService,
        PlayerService,
        CookieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
