import {Component, OnInit} from "@angular/core"
import {UserService} from "../service/user.service";
import {User} from "../model/user";


@Component({
    selector: "friends",
    templateUrl: "app/component/friends.component.html",
    styleUrls: ["assets/css/player.css"],
    providers: [UserService]
})
export class FriendsComponent implements OnInit {

    friends: Array<User> = [];

    constructor(private userService: UserService) {

    }

    ngOnInit(): void {
        this.userService.getFriends(20, 0).then(users => this.friends = users);
    }

}