import {Injectable} from "@angular/core";
import {Http, Response, Jsonp, URLSearchParams} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import {Track} from "../model/track"
import {AuthService} from './auth.service'

const GET_AUDIO_URL = "https://api.vk.com/method/audio.get?callback=JSONP_CALLBACK";
const SEARCH_AUDIO_URL = "https://api.vk.com/method/audio.search?callback=JSONP_CALLBACK";

@Injectable()
export class TrackService {

    constructor(private jsonp: Jsonp, private authService: AuthService) {
    }

    public getFriendTracks(count: number, offset: number, friendId: string): Promise<Track[]> {
        return this.getTracks(count, offset, friendId);
    }

    public getOwnTracks(count: number, offset: number): Promise<Track[]> {
        return this.getTracks(count, offset, this.authService.getUserId());
    }

    public searchTracks(count: number, offset: number, searchText: string): Promise<Track[]> {
        var params = new URLSearchParams();
        params.set('access_token', this.authService.getAccessToken());
        params.set('q', searchText);
        params.set('count', count.toString());
        params.set('offset', offset.toString());
        params.set('auto_complete', "1");
        params.set('performer_only', "1");
        params.set('sort', "1");
        params.set('search_own', "1");
        return this.jsonp.get(SEARCH_AUDIO_URL, {search: params})
            .map(res => res.json().response)
            .map((tracks) => {
                return this.parseTracks(tracks);
            })
            .toPromise();
    }

    public getTracks(count: number, offset: number, userId: string): Promise<Track[]> {
        var params = new URLSearchParams();
        params.set('access_token', this.authService.getAccessToken());
        params.set('owner_id', userId);
        params.set('count', count.toString());
        params.set('offset', offset.toString());
        return this.jsonp.get(GET_AUDIO_URL, {search: params})
            .map(res => res.json().response)
            .map((tracks) => {
                return this.parseTracks(tracks);
            })
            .toPromise();
    }

    private parseTracks(items: any): Track[] {
        let tracks: Array<Track> = [];
        if (items) {
            for (var i = 1; i < items.length; i++) {
                tracks.push(new Track(items[i]));
            }
        }
        return tracks;
    }

}
