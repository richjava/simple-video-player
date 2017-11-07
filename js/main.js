//data
var youtubeData = {
    "videos": ['9XVasMSJSoU', 'Di7RvMlk9io']
};

//once all HTML has loaded
$(function(){

//find DOM elements
var videoList = $('.video-list');

function getHTMLItem(youtubeID){
    return `<div class="video-list--item">
                <div>Img with ID ${youtubeID}</div>
                <div>Title</div>
            </div>`;
}

//loop through and display
function displayVideos(){
    var s = '';
    $.each(youtubeData.videos, function(i, youtubeID){
        s = s + getHTMLItem(youtubeID);
    });
    videoList.html(s);
}
displayVideos();
});