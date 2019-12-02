//once all HTML has loaded
$(function () {

    //video list
    var videos = null;

    //find DOM elements
    var videoListEl = $('.videolist'),
        playerEl = $('#player');


    /**
     * Initialise the app.
     */
    function init() {
        //get videos from JSON file (use-case 1)
        $.getJSON('json/videos.json', function (data) {
            videos = data.videos;
            displayVideos(videos);
        });
    }

    /**
     * Get the HTML template for each video list item (use-case 1)
     * @param  {Video} video
     */
    function getHTMLVideoItem(video) {
        return `<div data-id="${video.id}" class="videolist-item">
                    <div>
                        <img src="http://i4.ytimg.com/vi/${video.id}/default.jpg" alt="${video.title}">
                    </div>
                    <div>
                        <h3>${video.title}</h3>
                        <p>${video.category}</p>
                    </div>
                </div>`;
    }

    /**
     * Display a list of videos (use-case 1)
     * @param  {Array<Video>} videos
     */
    function displayVideos(videos) {
        var s = '';
        $.each(videos, function (i, video) {
            s = s + getHTMLVideoItem(video);
        });
        //set inner HTML of video list container with items
        videoListEl.html(s);

        //Use case 2
        //target the videos
        var videoEls = $(".videolist-item");
        //loop through and add click event listeners
        $.each(videoEls, function (i, video) {
            $(this).on('click', function () {
                playVideo($(this));
            });
        });
    }

    /**
     * Play the video (use-case 2)
     * @param  {HTMLDivElement} listItem
     */
    function playVideo(listItem) {
        var videoId = listItem.data('id');
        playerEl.attr('src', 'https://www.youtube.com/embed/' + videoId + '?rel=0&modestbranding=1&autohide=1&mute=1&showinfo=0&controls=0&autoplay=1');
    }

    init();
});