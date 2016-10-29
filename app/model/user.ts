export class User {

    uid: string;
    firstName: string;
    lastName: string;
    nickname: string;
    screenName: string;
    photoUrl: string;
    userId: string;


    constructor(item: any) {
        this.uid = item.id;
        this.firstName = item.first_name;
        this.lastName = item.last_name;
        this.nickname = item.nickname;
        this.screenName = item.screen_name;
        this.photoUrl = item.photo_50;
        this.userId = item.user_id;
    }
}