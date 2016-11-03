import {Component, Injectable, OnInit} from "@angular/core"
import {Track} from "../model/track";
declare var jPlayerPlaylist:any;
declare var jPlayerPlus:any;

@Injectable()
export class PlayerService {

    playlist:any;

    constructor() {
        this.initPlayer();
        jPlayerPlus();
    }

    public fillPlayer(tracks: Array<Track>): void {
        this.playlist.setPlaylist(tracks);
        setTimeout(() => {
            jPlayerPlus();
        }, 1000);
    }

    private initPlayer(): void {
        this.playlist = new jPlayerPlaylist({
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
    }

}