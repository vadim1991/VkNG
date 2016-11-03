import {Component, OnInit} from "@angular/core"
import {UserService} from "../service/user.service";
import {User} from "../model/user";
import {TrackService} from "../service/track.service";
import {PlayerService} from "../service/player.service";


@Component({
    selector: "friends",
    templateUrl: "app/component/friends.component.html",
    styleUrls: ["assets/css/player.css"]
})
export class FriendsComponent implements OnInit {

    friends:Array<User> = [];
    count:number = 30;
    offset:number = 0;
    isOver:boolean = false;
    selectedFriend: User;

    constructor(private userService:UserService, private trackService: TrackService, private playerService: PlayerService) {

    }

    ngOnInit():void {
        this.userService.getFriends(this.count, this.offset).then(users => this.friends = users);
        this.offset += this.count;
    }

    public onScrollDown():void {
        if (!this.isOver) {
            this.userService.getFriends(this.count, this.offset).then(users => {
                this.addAll(users);
                if (users.length > 0 && users.length >= this.count) {
                    this.offset += this.count;
                } else {
                    this.isOver = true;
                }
            });
        }
    }

    public onSelect(friend: User): void {
        this.selectedFriend = friend;
        this.trackService.getFriendTracks(30, 0, friend.userId).then(tracks => this.playerService.fillPlayer(tracks));
    }

    private addAll(newFriends:Array<User>):void {
        for (let i = 0; i < newFriends.length; i++) {
            this.friends.push(newFriends[i]);
        }
    }

}