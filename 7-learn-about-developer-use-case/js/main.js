//once all HTML has loaded
$(function () {

    //video list
    var videos = null;

    //find DOM elements
    var videoListEl = $('.videolist'),
        categoryListEl = $('.categorylist'),
        searchboxEl = $('#searchbox'),
        playerEl = $('#player'),
        screenLinksEls = $('.screen-link'),
        screensEls = $('.screen');
    

    /**
     * Initialise the app.
     */
    function init() {
        //get videos from JSON file (use-case 1)
        $.getJSON('json/videos.json', function (data) {
            videos = data.videos;
            displayVideos(videos);
        });

        //get categories from JSON file (use-case 4)
        $.getJSON('json/categories.json', function (data) {
            categories = data.categories;
            displayCategories(categories);
        });

        //add keyup event listener 
        searchboxEl.on('keyup', function (evt) {
            evt.preventDefault();
            if (evt.which === 13) {
                //if input is ID, a video will be returned, otherwise it's a search term
                var video = getVideoByID($(this).val());
                if (video) {
                    //use-case 6
                     displayVideos([video]);         
                }else{
                    //use-case 3
                    displayVideosByTitle($(this).val());
                }
            }
        });

        //add event listeners to screen links (use-case 7)
        $.each(screenLinksEls, function(i, link){
            $(this).on('click', changeScreen);
        });
        screensEls.eq(1).hide();
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
     * Display a list of videos (use-case 1 & 2)
     * @param  {Array<Video>} videos
     */
    function displayVideos(videos) {
        var s = '';
        $.each(videos, function (i, video) {
            s = s + getHTMLVideoItem(video);
        });
        //set inner HTML of video list container with items
        videoListEl.html(s);
        
        //Use-case 2
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
    * Display videos by title (use-case 3)
    * @param  {String} title
    */
    function displayVideosByTitle(title) {
        //create an empty "filteredVideos" array
        var filteredVideos = [];
        //loop through the videos ("videos" variable is global so you can use it)
        $.each(videos, function (i, video) {
            //if video title includes inputted title, add the video to array
            if (video.title.includes(title)) {
                filteredVideos.push(video);
            }
        });

        //display the videos
        displayVideos(filteredVideos);
    }

    /**
     * Play the video (use-case 2)
     * @param  {HTMLDivElement} listItem
     */
    function playVideo(listItem) {
        var videoId = listItem.data('id');
        playerEl.attr('src', 'https://www.youtube.com/embed/' + videoId + '?rel=0&modestbranding=1&autohide=1&mute=1&showinfo=0&controls=0&autoplay=1');
    }

     /**
    * Get the HTML template for each category list item (use-case 4)
    * @param  {Category} category
    */
   function getHTMLCategoryItem(category) {
    return `<li data-category="${category.slug}" class="categorylist-item">                   
                ${category.title}
            </li>`;
        }

   /**
   * Display a list of categories (use-case 4)
   * @param  {Array<Category>} categories
   */
  function displayCategories(categories) {
    var s = '';
    $.each(categories, function (i, category) {
        s = s + getHTMLCategoryItem(category);
    });
    //set inner HTML of video list container with items
    categoryListEl.html(s);

    //Use-case 5
    //target the videos
    var categoryEls = $('.categorylist-item');
    //loop through and add click event listeners
    $.each(categoryEls, function (i, category) {
        $(this).on('click', function () {
            var category = $(this).data('category');
            displayVideosByCategory(category);
        });
    });
}

/**
     * Display videos filtered by category (use-case 5)
     * @param  {String} category
     */
    function displayVideosByCategory(category) {
        //create an empty "filteredVideos" array
        var filteredVideos = [];
        //loop through the videos ("videos" variable is global so you can use it)
        $.each(videos, function (i, video) {
            //if video category equals category, add the video to array
            if (video.category === category) {
                filteredVideos.push(video);
            }
        });

        //display the videos
        displayVideos(filteredVideos);
    }

        /**
     * Get a video by its ID.
     * @param  {String} inputValue
     */
    function getVideoByID(inputValue) {
        //NOTE: The following (jQuery each method) doesn't work. See https://stackoverflow.com/questions/3946381/how-to-break-out-of-each-and-return-a-value-for-a-function
        // $.each(videos, function (i, video) {
        //     var id = video.id;
        //     if (id === inputValue) {
        //         return video;
        //     }
        // });

        //find out if ID exists in DB
        for (var i = 0; i < videos.length; i++) {
            var id = videos[i].id;
            if (id === inputValue) {
                return videos[i];
            }
        }
        return null;
    }

    /**
     * Change the screen (use-case 7)
     */
    function changeScreen(){
        //remove "active" class from all links
        screenLinksEls.removeClass('active');
        //"$(this)" is the link that was clicked
        $(this).addClass('active');

        //-------change screen-------//
        
        //hide all screens
        screensEls.hide();
        //find the screen to be shown
        var screenName = $(this).data('screen');
        $('#' + screenName).show();      
    }

    init();
});