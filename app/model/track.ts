export class Track {
  aid:string;
  url:string;
  mp3:string;

  constructor(item:any) {
    this.aid = item.id;
    this.url = item.url;
    this.mp3 = item.url;
  }

}
