import './rxjs-extensions';
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {AppComponent}  from './app.component';
import {SearchTracksComponent} from './search-tracks.component';
import {FriendsComponent} from './friends.component';
import {MyTracksComponent} from './my-tracks.component';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {RouterModule} from "@angular/router";
import {TrackService} from './service/track.service';
import {AuthService} from './service/auth.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
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
        CookieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
