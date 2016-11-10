import {Component} from "@angular/core"
import {PlayerService} from "../service/player.service";

@Component( {
    selector: "search-tracks",
    templateUrl: "app/component/search-tracks.component.html"
})

export class SearchTracksComponent {

    constructor(private playerService: PlayerService) {

    }

    public searchTracks(searchText: string): void {
        if (searchText) {
            this.playerService.searchTracks(searchText);
        }
    }

}