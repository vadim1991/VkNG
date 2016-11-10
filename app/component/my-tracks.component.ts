import {Component, OnInit} from "@angular/core"
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

    constructor(private playerService: PlayerService) {
        console.log("constr track service")
    }

    ngOnInit(): void {
        this.playerService.loadMyTracks()
    }

    public onScrollDown():void {
        console.log("on scroll playlist")
    }
}