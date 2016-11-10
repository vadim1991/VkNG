import {Component} from '@angular/core';
import {PlayerService} from "./service/player.service";

@Component({
  selector: 'my-app',
  templateUrl: "app/app.component.html",
  styleUrls: ["assets/css/player.css"]
})
export class AppComponent {

  constructor(private playerService: PlayerService) {
  }

  ngOnInit(): void {
  }

  public onScrollDown():void {
    console.log("on scroll playlist");
    this.playerService.loadMore();
  }

}
