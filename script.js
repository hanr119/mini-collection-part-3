/* globals require */
console.log("Hello, Airtable");

// load the airtable library, call it "Airtable"
var Airtable = require("airtable");
console.log(Airtable);

// use the airtable librar to get a variable that represents one of our bases
var base = new Airtable({ apiKey: "keyvXWve8WWEVE4xq" }).base(
  "apph2oW6SLsysUNwB"
);

//get the "books" table from the base, select ALL the records, and specify the functions that will receive the data
base("stories").select({}).eachPage(gotPageOfStories, gotAllStories);

// an empty array to hold our story data
const stories = [];

// callback function that receives our data
function gotPageOfStories(records, fetchNextPage) {
  console.log("gotPageOfStories()");
  // add the records from this page to our stories array
  stories.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllStories(err) {
  console.log("gotAllStories()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading stories");
    console.error(err);
    return;
  }

  // call functions to log and show the stories
  consoleLogStories();
  showStories();
}

// just loop through the stories and console.log them
function consoleLogStories() {
  console.log("consoleLogStories()");
  stories.forEach((story) => {
    console.log("Story:", story);
  });
}

// loop through the stories, create an element for each one, and add it to the page
function showStories() {
  console.log("showStories()");
  stories.forEach((story) => {
      // var storyTitle = document.createElement("h1");
      // storyTitle.innerText = story.fields.title;
      // document.body.append(storyTitle);

      // var nameOfAuthor = document.createElement("p");
      // nameOfAuthor.innerText = story.fields.author;
      // document.body.append(nameOfAuthor);

      // var storyCover = document.createElement("img");
      // storyCover.src = story.fields.cover[0].url;
      // document.body.append(storyCover);

      // creating a new div container
      // defining space for story info
      var storyContainer = document.createElement("div");
      storyContainer.classList.add("story-container");
      document.querySelector(".container").append(storyContainer);
      
      // add story titles to story container
      var storyTitle = document.createElement("h1");
      storyTitle.classList.add("story-title");
      storyTitle.innerText = story.fields.title;
      storyContainer.append(storyTitle);

      // add authors to story container
      var storyAuthor = document.createElement("h1");
      storyAuthor.classList.add("story-author");
      storyAuthor.innerText = story.fields.author;
      storyContainer.append(storyAuthor);

      // add summary to story container
      storySummary = document.createElement("p");
      storySummary.classList.add("story-summary");
      storySummary.innerText = story.fields.summary;
      storyContainer.append(storySummary);

      // add image to story container
      var storyCover = document.createElement("img");
      storyCover.classList.add("story-cover");
      storyCover.src = story.fields.cover[0].url;
      storyContainer.append(storyCover);

      // add event listener
      // when user clicks on story container, image and cover will toggle visibility
      // storyContainer.addEventListener("click", function(){
      //     storySummary.classList.toggle("active");
      //     storyContainer.classList.toggle("active");
      // })

      // get type field from airtable
      // loop through the array and add each genre as a class to the story container
      var storyType = story.fields.type;
      storyType.forEach(function(type){
          storyContainer.classList.add(type);
      })

      // add event listener to filter to add active class to story

      var filterDarkHumor = document.querySelector.apply(".dark-humor");
      filterDarkHumor.addEventListener("click", function(){
          if (storyContainer.classList.contains("dark-humor")) {
            storyContainer.style.background = "#FFFFFF30";
          } else {
            storyContainer.style.background = "black"
          }
      })
      
    });
}
