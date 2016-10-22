var playlist;
var offsetTracksValue = 0;
var offsetFriendsValue = 0;
var countTracksValue = 30;
var countFriendsValue = 30;
var hasMore = true;
var hasMoreFriends = true;
var wasLoadedFriend = false;
var action = "myTracks";
var friendID;
$(document).ready(function () {
    loadMyTracks();
});

$(document).ready(function () {
    $(".scrollbar").scroll(function () {
        if ($(this)[0].scrollHeight - $(this).scrollTop() === $(this).outerHeight() && hasMore) {
            var params = JSON.stringify({count: countTracksValue, offset: offsetTracksValue});
            var url = "/tracks";
            if ("search" === action) {
                url = "/search";
                var searchText = $("#search-text").val();
                var audioSearchBean = {};
                audioSearchBean["count"] = countTracksValue;
                audioSearchBean["offset"] = offsetTracksValue;
                audioSearchBean["searchText"] = searchText;
                params = JSON.stringify(audioSearchBean);
            } else if (action === "friends") {
                var trackParams = {};
                trackParams["count"] = countTracksValue;
                trackParams["offset"] = offsetTracksValue;
                trackParams["ownerID"] = friendID;
                params = JSON.stringify(trackParams);
                console.log(params);
            }
            createSpinner("#overflow-scroll");
            $.ajax({
                url: url,
                method: "post",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: params,
                success: function (data) {
                    if (data.length == 0) {
                        hasMore = false;
                    }
                    offsetTracksValue += countTracksValue;
                    data.forEach(function (track) {
                        playlist.add(track);
                    });
                    $("#jquery_jplayer_1").bind($.jPlayer.event.loadeddata, function (event) {
                        jPlayerPlus();
                    });
                    hideSpinner("#overflow-scroll");
                }
            })
        }
    });
});

$("#search").click(function () {
    changeActiveMenu($(this));
    hideHeadersForSearch();
});

$("#my-tracks").click(function () {
    changeActiveMenu($(this));
    hideHeadersForMyTracks();
    if (action === "myTracks") {
        return;
    }
    action = "myTracks";
    hasMore = true;
    offsetTracksValue = 0;
    $.ajax({
        url: "/tracks",
        method: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({count: countTracksValue, offset: offsetTracksValue}),
        success: function (data) {
            offsetTracksValue += countTracksValue;
            playlist.setPlaylist(data);
        }
    });

    $("#jquery_jplayer_1").bind($.jPlayer.event.loadeddata, function (event) {
        jPlayerPlus();
    });
});

$(document).ready(function () {
    $("#search-submit").click(function () {
        hasMore = true;
        offsetTracksValue = 0;
        var searchText = $("#search-text").val();
        action = "search";
        if (searchText.length > 0) {
            var audioSearchBean = {};
            audioSearchBean["count"] = countTracksValue;
            audioSearchBean["offset"] = offsetTracksValue;
            audioSearchBean["searchText"] = searchText;
            $.ajax({
                url: "/search",
                method: "post",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(audioSearchBean),
                success: function (data) {
                    offsetTracksValue += countTracksValue;
                    playlist.setPlaylist(data);
                }
            });
        }
    });
});

function loadMyTracks() {
    $.ajax({
        url: "/tracks",
        method: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({count: countTracksValue, offset: offsetTracksValue}),
        success: function (data) {
            action = "myTracks";
            offsetTracksValue += countTracksValue;
            playlist = new jPlayerPlaylist({
                jPlayer: "#jquery_jplayer_1",
                cssSelectorAncestor: "#jp_container_1"
            }, data, {
                playlistOptions: {
                    enableRemoveControls: true
                },
                swfPath: "./assets/js/jplayer/",
                supplied: "mp3",
                smoothPlayBar: true,
                audioFullScreen: true
            });

        }
    });

    $("#jquery_jplayer_1").bind($.jPlayer.event.loadeddata, function (event) {
        jPlayerPlus();
    });
}

$(document).ready(function () {
    $(".friend-list").scroll(function () {
        if ($(this)[0].scrollHeight - $(this).scrollTop() === $(this).outerHeight() && hasMoreFriends) {
            createSpinner("#friend-list");
            $.ajax({
                url: "/friends",
                method: "post",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({count: countFriendsValue, offset: offsetFriendsValue}),
                success: function (data) {
                    if (data.length == 0) {
                        hasMoreFriends = false;
                    }
                    offsetFriendsValue += countFriendsValue;
                    addFriendsToPage(data);
                    hideSpinner("#friend-list");
                }
            });
        }
    })
});

$("#friends").click(function () {
    changeActiveMenu($(this));
    if (wasLoadedFriend) {
        hideHeadersForFriends();
        $("#friend-list").show("slow");
        return;
    }
    hasMoreFriends = true;
    offsetFriendsValue = 0;
    hideHeadersForFriends();
    $.ajax({
        url: "/friends",
        method: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({count: countFriendsValue, offset: offsetFriendsValue}),
        success: function (data) {
            wasLoadedFriend = true;
            addFriendsToPage(data);
            offsetFriendsValue += countFriendsValue;
            $("#friend-list").show("slow");
        }
    });
});

function hideHeadersForFriends() {
    $("#page-header").hide("slow");
    $("#search-header").hide("slow");
    $(".webdesigntuts-workshop").hide("slow");
    $("#friends-header").show("slow");
}

function hideHeadersForMyTracks() {
    $("#search-header").hide("slow");
    $("#friend-list").hide("slow");
    $(".webdesigntuts-workshop").hide("slow");
    $("#friends-header").hide("slow");
    $("#page-header").show("slow");
}

function hideHeadersForSearch() {
    $("#page-header").hide("slow");
    $("#friend-list").hide("slow");
    $("#search-header").show("slow");
    $("#friends-header").hide("slow");
    $(".webdesigntuts-workshop").show("slow");
}

function createSpinner(elementID) {
    $(elementID).waitMe({
        effect: "bounce",
        text: 'Please waiting...',
        bg: 'rgba(255,255,255,0.2)',
        color: '#000'
    });
}

function hideSpinner(elementID) {
    $(elementID).waitMe("hide");
}

function changeActiveMenu(element) {
    $(element).parent().parent().find('li').removeClass("active");
    $(element).parent().addClass("active");
}

$(document).on("click", '.friend', function (event) {
    $(".friend").removeClass("green");
    $(this).addClass("green");
    action = "friends";
    offsetTracksValue = 0;
    friendID = $(this).attr("data-id");
    var trackParams = {};
    trackParams["count"] = countTracksValue;
    trackParams["offset"] = offsetTracksValue;
    trackParams["ownerID"] = friendID;
    var params = JSON.stringify(trackParams);
    $.ajax({
        url: "/tracks",
        method: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: params,
        success: function (data) {
            playlist.setPlaylist(data);
            offsetTracksValue += countTracksValue;
        }
    });
});


$(document).on("click", '.soundcloud', function (event) {
    var currentElement = $(this);
    $.ajax({
        url: "/share",
        method: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: {
            id: playlist.playlist[$(this).parent().parent().index()].aid
        },
        success: function (data) {
            currentElement.addClass("green");
        }
    });
});

$(document).on("click", '.add', function (event) {
    var currentElement = $(this);
    var track = playlist.playlist[$(this).parent().parent().index()];
    $.ajax({
        url: "/tracks/add",
        method: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ownerID: track.owner_id, audioID: track.aid}),
        success: function (data) {
            currentElement.addClass("green");
        }
    });
});

$(document).on("click", '.delete', function (event) {
    var index = $(this).parent().parent().index();
    var track = playlist.playlist[index];
    $.ajax({
        url: "/tracks/delete",
        method: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ownerID: track.owner_id, audioID: track.aid}),
        success: function (data) {
            playlist.remove(index);
        }
    });
});

function addFriendsToPage(data) {
    data.forEach(function (friend) {
        var element = "<li><a class='friend' href='#friend&id=" + friend.uid + "' data-id='" + friend.uid + "'><img class='friend-img' src='" + friend.photo_50 + "'><span class='track-title'>" + friend.last_name + " " + friend.first_name + "</span></a></li>";
        var friends = $("#friend-list").find(".friends");
        friends.append(element);
    });
}