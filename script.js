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
      var storyTitle = document.createElement("h1");
      storyTitle.innerText = story.fields.title;
      document.body.append(songTitle);

      var nameOfAuthor = document.createElement("p");
      nameOfAuthor.innerText = story.fields.artist;
      document.body.append(nameOfAuthor);

      var storyCover = document.createElement("img");
      songImage.src = story.fields.cover[0].url;
  });
}
