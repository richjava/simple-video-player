# simple-video-player
A really simple Youtube video player built in jQuery without the Youtube API.

## Use cases

### 1. View list

* Create a Javascript object that contains an array of objects that will represent videos (video name, Youtube video ID, etc)
* Create functionality that will use this data to display a “list” of items. You won’t need an image (thumbnail) URL because you can get one by using the Youtube ID 

### 2. View video

Add functionality that will display and play a video if the image is clicked.
* Get the embed code for a Youtube video (it will be an iframe)
* Use Javascript to change the src attribute of the iframe

### 3. Filter videos by title

* Build a search form that will take the input of a name, or part of a name, of a video
* Create functionality that will find matching videos and display them
* Sanitise the input by removing any leading or trailing spaces

### 4. View Categories

Build in functionality for the user to view categories.

### 5. Filter by category

Build in functionality so that when the user inputs (chooses) a category, the application will display all videos that belong to that category.
Do do this, you can:
* create a separate set of JSON data for categories
* give an ID property to each category object
* for each video object in your videos data, have a reference to the category ID (i.e. "categoryId")

### 6. Advanced search

Right now the user can filter by video name and by category but not both at the same time. We will now allow the user to search with a combination of these fields  plus any more we feel are appropriate.

### 7. Learn about developer

At the moment, your application has just one screen. We will build an About page which will introduce the developer  ( you). This is called “ routing”. 
We could just hard code the HTML for this and show/hide it when necessary, but doing so would mean that the browser may need to do some unnecessary work when the page loads ( if the user never goes to that screen, it was loaded for no reason - even though it was hidden). For this reason, we should try to load the content at the time it is going to be used. This is called “ lazy loading”.

#### Procedures
* Create a links with the text “Home” and “About” in your main nav
* On the click of each of these links, your two screens should show and hide respectively
* Create a set of JSON data that can be used on your About screen
* Load this into your about screen only if the About screen has been clicked (and only on the first click)