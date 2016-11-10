import {Component, Injectable, OnInit} from "@angular/core"
import {Track} from "../model/track";
import {TrackService} from "./track.service";
declare var jPlayerPlaylist:any;
declare var jPlayerPlus:any;

const COUNT_DEFAULT = 20;
const OFFSET_DEFAULT = 0;
const MY_TRACKS_OPERATION = "my-tracks";
const FRIEND_TRACKS_OPERATION = "friend-tracks";
const SEARCH_TRACKS_OPERATION = "search";

@Injectable()
export class PlayerService {

    playlist:any;
    count:number = COUNT_DEFAULT;
    offset:number = OFFSET_DEFAULT;
    prevOperation: string;
    friendId: string;
    searchText: string;
    hasMore: boolean = true;

    constructor(private trackService: TrackService) {
        this.initPlayer();
        jPlayerPlus();
    }

    public loadMyTracks(): void {
        if (MY_TRACKS_OPERATION != this.prevOperation) {
            this.resetCountAndSetOperation(MY_TRACKS_OPERATION);
            this.trackService.getOwnTracks(this.count, this.offset).then(tracks => this.fillPlayer(tracks));
        }
        this.prevOperation = MY_TRACKS_OPERATION;
    }

    public loadFriendTracks(friendId: string): void{
        this.resetCountAndSetOperation(FRIEND_TRACKS_OPERATION);
        this.offset = OFFSET_DEFAULT;
        this.friendId = friendId;
        this.trackService.getFriendTracks(this.count, this.offset, this.friendId).then(tracks => this.fillPlayer(tracks));
    }

    public searchTracks(searchText: string): void {
        this.resetCountAndSetOperation(SEARCH_TRACKS_OPERATION);
        this.offset = OFFSET_DEFAULT;
        this.searchText = searchText;
        this.trackService.searchTracks(this.count, this.offset, searchText). then(tracks => this.fillPlayer(tracks));
    }

    public loadMoreMyTracks(): void {
        if (this.hasMore) {
            this.offset += this.count;
            this.trackService.getOwnTracks(this.count, this.offset).then(tracks => {
                console.log(tracks);
                this.addTracks(tracks);
                this.hasMore = tracks.length >= this.count;
                console.log(this.hasMore);
            });
        }
    }

    public loadMoreFriendTracks(): void {
        if (this.hasMore) {
            this.offset += this.count;
            this.trackService.getFriendTracks(this.count, this.offset, this.friendId).then(tracks => {
                this.addTracks(tracks);
                this.hasMore = tracks.length >= this.count;
            });
        }
    }

    public loadMoreSearchTracks(): void {
        if (this.hasMore) {
            this.offset += this.count;
            this.trackService.getFriendTracks(this.count, this.offset, this.searchText).then(tracks => {
                this.addTracks(tracks);
                this.hasMore = tracks.length >= this.count;
            });
        }
    }

    public loadMore() {
        switch (this.prevOperation) {
            case MY_TRACKS_OPERATION:
                this.loadMoreMyTracks();
                break;
            case FRIEND_TRACKS_OPERATION:
                this.loadMoreFriendTracks();
                break;
            case SEARCH_TRACKS_OPERATION:
                this.loadMoreSearchTracks();
                break;
            default: console.log("load more unknown track operation");
        }
    }

    public fillPlayer(tracks: Array<Track>): void {
        this.playlist.setPlaylist(tracks);
        setTimeout(() => {
            jPlayerPlus();
        }, 1000);
    }

    public addTracks(tracks: Array<Track>): void {
        for (var i = 1; i < tracks.length; i++) {
            this.playlist.add(tracks[i]);
        }
        setTimeout(() => {
            jPlayerPlus();
        }, 1000);
    }

    private resetCountAndSetOperation(operation: string): void {
        this.offset = OFFSET_DEFAULT;
        this.prevOperation = operation;
        this.hasMore = true;
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