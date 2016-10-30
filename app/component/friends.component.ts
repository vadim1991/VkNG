import {Component, OnInit} from "@angular/core"
import {UserService} from "../service/user.service";
import {User} from "../model/user";
declare var jPlayerPlaylist: any;


@Component({
    selector: "friends",
    templateUrl: "app/component/friends.component.html",
    styleUrls: ["assets/css/player.css"],
    providers: [UserService]
})
export class FriendsComponent implements OnInit {

    friends:Array<User> = [];
    count:number = 30;
    offset:number = 0;
    isOver:boolean = false;

    constructor(private userService:UserService) {

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
        console.log("scrolling");
        let play = new jPlayerPlaylist({
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
        console.log(play);
    }

    private addAll(newFriends:Array<User>):void {
        for (let i = 0; i < newFriends.length; i++) {
            this.friends.push(newFriends[i]);
        }
    }

}