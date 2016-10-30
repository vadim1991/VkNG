import {Component, Injectable, OnInit} from "@angular/core"
import {Track} from "../model/track";
declare var jPlayerPlaylist:any;

@Injectable()
export class PlayerService implements OnInit {

    playlist:any;

    ngOnInit():void {
        // this.playlist = new jPlayerPlaylist({
        //     jPlayer: "#jquery_jplayer_1",
        //     cssSelectorAncestor: "#jp_container_1"
        // }, [], {
        //     playlistOptions: {
        //         enableRemoveControls: true
        //     },
        //     swfPath: "./assets/js/jplayer/",
        //     supplied: "mp3",
        //     smoothPlayBar: true,
        //     audioFullScreen: true
        // });
    }

    public fillPlayer(tracks: Array<Track>): void {
        this.playlist = new jPlayerPlaylist({
            jPlayer: "#jquery_jplayer_1",
            cssSelectorAncestor: "#jp_container_1"
        }, tracks, {
            playlistOptions: {
                enableRemoveControls: true
            },
            swfPath: "./assets/js/jplayer/",
            supplied: "mp3",
            smoothPlayBar: true,
            audioFullScreen: true
        });
        // this.playlist.setPlaylist(tracks);
    }

}