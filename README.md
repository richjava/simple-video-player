# simple-video-player
A really simple Youtube video player built in jQuery without the Youtube API. No styling, just code. The focus is on learning how to build a basaic Javascript/jQuery single page application from a set of use cases.

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

## Refactoring
The project need to be refactored to use the popular templating engine [Handlebars](https://handlebarsjs.com/) instead of ES6 template literals. This so that the HTML doesn't need to be written in strings and can be more modular/reusable. The use of Handlebars is minimal so as not to over-complicate the code, and can be taken further to make the most of the features.

#### Procedures
* Initiate the project with npm ("npm init")
* Install Handlebars ("npm i handlebars --save")
* Add templates into HTML, for example:
````
<script id="category-item" type="text/x-handlebars-template">
    <li data-category="{{slug}}" class="categorylist-item">
        {{title}}
    </li>
</script>
````
* Refactor the JS to use the Handlebars templating engine, for example:
````
    /**
     * Get the HTML template for each category list item (use-case 4)
     * @param  {Category} category
     */
    function getHTMLCategoryItem(category) {
        var template = $('#category-item').html();
        var templateScript = Handlebars.compile(template);
        return templateScript(category);
    }
````