"use strict";
var User = (function () {
    function User(item) {
        this.uid = item.id;
        this.firstName = item.first_name;
        this.lastName = item.last_name;
        this.nickname = item.nickname;
        this.screenName = item.screen_name;
        this.photoUrl = item.photo_50;
        this.userId = item.user_id;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map