import {Component, OnInit} from "@angular/core"
import {TrackService} from "../service/track.service";
import {PlayerService} from "../service/player.service";
import {Track} from "../model/track";

@Component({
    selector: "my-tracks",
    templateUrl: "app/component/my-tracks.component.html"
})

export class MyTracksComponent implements OnInit {

    tracks:Array<Track> = [];
    count:number = 30;
    offset:number = 0;
    isOver:boolean = false;

    constructor(private trackService: TrackService, private playerService: PlayerService) {
        console.log("constr track service")
    }

    ngOnInit(): void {
        this.trackService.getOwnTracks(30, 0).then(tracks => {
            console.log(tracks);
            this.playerService.fillPlayer(tracks);
        });
    }

    // public onScrollDown():void {
    //     if (!this.isOver) {
    //         this.userService.getFriends(this.count, this.offset).then(users => {
    //             this.addAll(users);
    //             if (users.length > 0 && users.length >= this.count) {
    //                 this.offset += this.count;
    //             } else {
    //                 this.isOver = true;
    //             }
    //         });
    //     }
    // }
}