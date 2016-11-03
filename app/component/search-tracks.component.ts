import {Component} from "@angular/core"
import {TrackService} from "../service/track.service";
import {PlayerService} from "../service/player.service";

@Component( {
    selector: "search-tracks",
    templateUrl: "app/component/search-tracks.component.html"
})

export class SearchTracksComponent {

    constructor(private trackService: TrackService, private playerService: PlayerService) {

    }

    public searchTracks(searchText: string): void {
        this.trackService.searchTracks(30, 0, searchText).then(tracks => this.playerService.fillPlayer(tracks));
    }

}