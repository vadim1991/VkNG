import {Component, OnInit} from "@angular/core"
import {TrackService} from "../service/track.service";
import {PlayerService} from "../service/player.service";

@Component( {
    selector: "my-tracks",
    templateUrl: "app/component/my-tracks.component.html",
    providers: [TrackService, PlayerService]
})

export class MyTracksComponent implements OnInit{

    constructor(private trackService: TrackService, private playerService: PlayerService) {

    }

    ngOnInit():void {
        this.trackService.getOwnTracks(10, 0).then(tracks => {
            console.log(tracks);
            this.playerService.fillPlayer(tracks);
        });

    }
}