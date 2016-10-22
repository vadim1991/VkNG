	$(document).ready(function(){
	var listTrack;
	var trackParam = {};
	trackParam["count"] = 10;
	trackParam["offset"] = 0;
		console.log(JSON.stringify(trackParam));
    var player;
                $.ajax({
                    url: "/shared-tracks",
                    method: "post",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(trackParam),
                    success: function (data) {
                        listTrack = data;
		var player = new jPlayerPlaylist({
			jPlayer: "#jquery_jplayer_2",
			cssSelectorAncestor: "#jp_container_2"
		}, listTrack, {
			swfPath: "./assets/js/jplayer/",
			supplied: "mp3",
			smoothPlayBar: true,
		});
		console.log(player);
        }
    });
	});