"use strict";
var Track = (function () {
    function Track(item) {
        this.aid = item.aid;
        this.url = item.url;
        this.mp3 = item.url;
        this.owner_id = item.owner_id;
        this.artist = item.artist;
        this.title = item.title;
        this.duration = item.duration;
        this.album = item.album;
        this.genre = item.genre;
        this.added = true;
        this.delete = false;
        this.soundcloud = false;
    }
    return Track;
}());
exports.Track = Track;
//# sourceMappingURL=track.js.map