//once all HTML has loaded
$(function () {

    //video list
    var videos = null;

    //find DOM elements
    var videoList = $('.videolist'),
        player = $('#player');
    
    /**
     * Initialise the app.
     */
    function init() {
        //get videos from JSON file
        $.getJSON('json/videos.json', function (data) {
            videos = data.videos;
            displayVideos(videos);
        });
    }

    /**
     * Get the HTML template for each video list item.
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
     * Display a list of videos.
     * @param  {Array<Video>} videos
     */
    function displayVideos(videos) {
        var s = '';
        $.each(videos, function (i, video) {
            s = s + getHTMLVideoItem(video);
        });
        //set inner HTML of video list container with items
        videoList.html(s);
    }

    init();
});