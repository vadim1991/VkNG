export class Track {
  aid:string;
  url:string;
  mp3:string;
  owner_id:string;
  artist:string;
  title:string;
  duration:number;
  genre:number;
  album:string;
  added:boolean;
  delete:boolean;
  soundcloud:boolean;

  constructor(item:any) {
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

}
