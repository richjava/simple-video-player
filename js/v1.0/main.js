//data
var youtubeData = {
    "videos": ['9XVasMSJSoU', 'Di7RvMlk9io']
};

//once all HTML has loaded
$(function () {

    //find DOM elements
    var videoList = $('.video-list'),
        searchbox = $('#searchbox'),
        player = $('#player');
        

    function init() {
        searchbox.on('keyup', function (evt) {
            evt.preventDefault();
            if (evt.which === 13) {
                getVideoByID($(this));
            }
        });
        displayVideos(youtubeData.videos);
    }

    function getVideoByID(searchbox) {
        var inputValue = searchbox.val();
        //find out if ID exists in DB
        if (youtubeData.videos.indexOf(inputValue) !== -1) {
            //found ID in DB
            displayVideos([inputValue]);
        }
    }

    function getHTMLItem(youtubeID) {
        return `<div data-id="${youtubeID}" class="video-list--item">
                <div></div>
                <div>Title</div>
            </div>`;
    }

    //loop through and display
    function displayVideos(videoIds) {
        var s = '';
        $.each(videoIds, function (i, youtubeID) {
            s = s + getHTMLItem(youtubeID);
        });
        //set inner HTML of video list container with items
        videoList.html(s);
        //target the videos
        var videos = $('.video-list--item');
        //loop through and add click event listeners
        $.each(videos, function (i, video) {
            $(this).on('click', function(){
                playVideo($(this));
            });
        });
    }

    function playVideo(listItem) {
        var videoId = listItem.data('id');
        player.attr('src', 'http://www.youtube.com/embed/'+ videoId + '?autoplay=1');
    }

    init();
});