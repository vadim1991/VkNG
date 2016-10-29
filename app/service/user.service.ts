import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise';
import {AuthService} from "./auth.service";
import {Http, Response, Jsonp, URLSearchParams} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from "../model/user";

const URL = "https://api.vk.com/method/friends.get?callback=JSONP_CALLBACK";
const FIELDS = "uid,first_name,last_name,nickname,screen_name,sex,photo_50";
const USER_ORDER = "hints";

@Injectable()
export class UserService {

    constructor(private jsonp: Jsonp, private authService: AuthService) {

    }

    public getFriends(count: number, offset: number): Promise<User[]> {
        var params = new URLSearchParams();
        params.set('access_token', this.authService.getAccessToken());
        params.set('user_id', this.authService.getUserId());
        params.set('order', USER_ORDER);
        params.set('fields', FIELDS);
        params.set('count', count.toString());
        params.set('offset', offset.toString());
        return this.jsonp.get(URL, {search: params})
            .map(res => res.json().response)
            .map((users) => {
                return this.parseUsers(users);
            })
            .toPromise();
    }

    private parseUsers(items: User[]) {
        let users: Array<User> = [];
        for (var i = 1; i < items.length; i++) {
            users.push(new User(items[i]));
        }
        return users;
    }

}