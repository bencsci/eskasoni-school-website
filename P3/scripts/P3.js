/**
 * Contains both local and client-side functions for the Mi'kmaq language game.
 * Also handles drag-and-drop functionality so that the image of the bear can persist in its 
 * dropped location and its dropped location can be checked against the correct answer. 
 * The client-side functions transmit the score to and from the server so that the score can 
 * persist between page refreshes until the server is closed. 
 * 
 * Author: Baxter Madore
 * Author: Ben Le
 * Author: Caleb Bulmer
 * Author: JC Blais
 *
 */



/*******************************GLOBAL CONSTANTS*/

//The images representing miqmaq words, as their HTML ids.
//If you need the file names, just append ".jpg" to any of them
//(global variable)
const IMAGE_IDS = [
  "aqq",
  "eliey",
  "kesalk",
  "kil",
  "ltu",
  "mijisi",
  "nin",
  "teluisi",
  "wiktm",
];

//global constant with the url of the server for get and post requests
const SERVER_URL = "http://ugdev.cs.smu.ca:3737"; 

/******************************global variables*/
let correctAnswer, // holds the name of the current word displayed on the screen. used to check if the user's answer is correct
  imageDroppedOn, // holds the name of the image that the bear was dropped on
  allowGuesses,
  /*allowGuesses is a boolean which states if the user is allowed to place the bear somewhere.
  it is reset to true at the start of the round, and made false when the bear is dropped.*/
  isCorrect, // boolean to check if the user got the correct answer or not
  numOfCorrect = 0, // number of correct guesses
  numOfAttempts = 0; //number of total attempts



$(document).ready(get());
//run get on page load so that the client variables are correctly synced with the server variables. 
$(document).ready(updateScoreboard());
//update the scoreboard with the just-fetched variables. if no variables were just fetched
//(likely due to the server not running), the scoreboard will display 0/0 at the start

/**
 * This function will check if the image dropped is correct and show the fail/win images.
 *
 * @param decision is the number of the image where the bear was dropped
 *
 * Author: JC Blais: Wrote code to display images for winning or losing
 */
function checkAnswer(decision) {
  numOfAttempts++; // updates the total guesses everytime a answer is checked
  if (decision === correctAnswer) {
    isCorrect = true;

    //This will show the win stars on the left side of the grid
    document.getElementById("winstar1").style.display = "block";
    document.getElementById("winstar2").style.display = "block";
    document.getElementById("wintext").style.display = "block";

    //hides the volume button
    document.getElementById("volumeButton").style.display = "none";
    //hides the current word
    document.getElementById("currWord").style.display = "none";
    //shows the restart button

    document.getElementById("restart").style.display = "block";
    document.getElementById("restart").style.margin = "auto";

    numOfCorrect++; // updates the number of correct guesses
  } else {
    isCorrect = false;

    //This will show the flowers on the right side of the grid
    document.getElementById("loseflower1").style.display = "block";
    document.getElementById("loseflower2").style.display = "block";
    document.getElementById("losetext").style.display = "block";

    //hides the volume button
    document.getElementById("volumeButton").style.display = "none";
    //hides the current currWord
    document.getElementById("currWord").style.display = "none";
    //shows the restart button
    document.getElementById("restart").style.display = "block";
    document.getElementById("restart").style.margin = "auto";
  }

  // needed to add this because sometimes the bear wouldn't disappear when the winstars displayed
  document.getElementById("bearHolder").innerHTML = "";

  post();
}

/**
 * This function generates a random number between 0 and param max, exclusive.
 *
 * @param max is the number of which a random number can be picked from
 * @return a random int
 *
 * Author: JC Blais: Initial function logic
 */
function randomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * This function stores the id of the bear being dragged
 * in a storage area under the key "text". Target is the
 * bear being dragged.
 *
 * @param event the event object being loaded for dragging
 *
 * Author: Caleb Bulmer
 */
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

/**
 * This function suspends default behaviour for a
 * potential new position for the bear, allowing the bear to be dropped and 
 * stay in the new location. Target
 * is the potential element where the bear could be
 * dropped.
 *
 * @param event the event object being loaded for allowDrop
 * @param image The passed in image to be hidden.
 *
 * Author: Caleb Bulmer
 * Author: Baxter Madore: moved the code for showing images to a seperate
 *		   function and integrateed allowGuesses
 */
function allowDrop(event, image) {
  if (allowGuesses) {
    event.preventDefault();
    showAllImages();
    document.getElementById(event.target.id).style.opacity = 0; 
	//hide the element that the bear is being hovered over
  }
}

/**
 * This function will be called when the dragged
 * element is decided to be dropped in the position.
 *
 * @param event the event object being loaded for drop
 *
 * Author: Caleb Bulmer: function logic and flow
 * Author: Ben Le: added code to show the bear when dropped
 * Author: Baxter Madore: Removed jQuery dependency
 */
function drop(event) {
  event.preventDefault();

  // completely hide the image so when the bear appears it doesn't stretch
  document.getElementById(event.target.id).style.display = "none";
  imageDroppedOn = event.target.id;

  // makes the hidden bear behind the photo visible
  document.getElementById(event.target.id + "Bear").style.display = "block";
  
  //makes the previously hidden bear non-draggable
  document
    .getElementById(event.target.id + "Bear")
    .setAttribute("draggable", "false");

  // contains the id of the element that was being dragged
  let data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));

  allowGuesses = false;
  checkAnswer(imageDroppedOn);

  // needed to add this because sometimes the bear wouldn't disappear when the winstars displayed
  document.getElementById("bearHolder").innerHTML = "";
}

/**
 * Displays all of the images. Makes the images come back after being
 * hidden on dragover or having the bear put on them.
 * Author: Baxter Madore
 */

function showAllImages() {
  for (let count = 0; count < IMAGE_IDS.length; count++) {
    document.getElementById(IMAGE_IDS[count]).style.opacity = 1;
    document.getElementById(IMAGE_IDS[count]).style.display = "block";
  }
}

/**
 * This function plays the correct audio file when the volume
 * button is clicked on.
 *
 * Author: Baxter Madore
 * Author: Caleb Bulmer: Implemented the correct audio files
 */
function playSound() {
  document.getElementById("audio_" + correctAnswer).play();
}

/**
 * This function gets a random word out of the array of possible words and displays it at the top of the screen
 * for user to play. Sets the answer to the correctAnswer.
 *
 * Author: Ben Le: Initial logic and control flow
 */
function getRandomWords() {
  const max = 9;
  let randomNum = randomInt(max);
  //sets the image to the image of the chosen word
  document.getElementById("currWordImg").src =
    "./images/" + IMAGE_IDS[randomNum] + "Text.jpg";
  correctAnswer = IMAGE_IDS[randomNum];
}

/**
 * This function restarts the table by setting allowGuesses
 * to true, resetting the table to its original
 * position, and updates Scoreboard.
 *
 * Author: Caleb Bulmer: Initial function logic
 * Author: Baxter Madore: Added code to return the bear to its holder
 * and restore images from under the bear
 * Author: Ben Le: Added code to display another random word
 */
function restartGame() {
  allowGuesses = false;

  document.getElementById("bearHolder").innerHTML =
    "<img src='./images/bear.jpg' id='bear' ondragstart='drag(event)'>";

  //hide the text
  document.getElementById("wintext").style.display = "none";
  document.getElementById("losetext").style.display = "none";

  showAllImages();

  //hide the winstars
  document.getElementById("winstar1").style.display = "none";
  document.getElementById("winstar2").style.display = "none";

  //hide the loseflowers
  document.getElementById("loseflower1").style.display = "none";
  document.getElementById("loseflower2").style.display = "none";

  //hide the bear behind the images
  if (isCorrect === true) {
    document.getElementById(correctAnswer + "Bear").style.display = "none";
  } else {
    document.getElementById(imageDroppedOn + "Bear").style.display = "none";
  }
  
  //hides the restart button
  document.getElementById("restart").style.display = "none";
  //shows the new score
  updateScoreboard();
}

/**
 * This function updates and shows the updated scoreboard.
 * Note that if the server is non-functional, score is 
 * still counted locally, at least until the server resets. 
 * Ben Le: main logic and function
 */
function updateScoreboard() {
  //updates the scoreboard
  document.getElementById("scoreDisplay").innerHTML =
    numOfCorrect + "/" + numOfAttempts;

  //shows the updated score
  document.getElementById("clickYourScore").style.display = "block";
}

/**
 * This fuction rollis a new random int to represent as the
 * new word, and displays the new word. It is run at the start of a round, after the user clicks
 * the "click your score" button
 * Ben Le: main logic and function
 *
 */
function continueGame() {
  allowGuesses = true;

  //hides score
  document.getElementById("clickYourScore").style.display = "none";

  document.getElementById("volumeButton").style.display = "block";

  //shows the new random word
  document.getElementById("currWord").style.display = "block";
  getRandomWords();
}

/****************************************************** SERVER CODE ***************************/

/*
  The purpose of this function is to POST the score (as a JSON object) to the 
  server at ugdev.cs.smu.ca:3737 
  Author: Terry Goldsmith
  Author: Baxter Madore - Modified code to work with score object
*/
function post() {
  // define the object to be posted
  let score = { corrects: numOfCorrect, attempts: numOfAttempts };
  // if (the middleware for this endpoint ran without error)
  //   call postSuccess
  // else
  //   call errorFn
  $.post(SERVER_URL, score, postSuccess).fail(failFunc);
}

/*
  The purpose of this function is to GET the score JSON object from the
  server. 
  Author: Terry Goldsmith
  Author: Baxter Madore - Modified code to no longer require the endpoint myGet
  */
function get() {
  // attempt to GET the score back from the server.
  // if (the middleware for this endpoint ran without error)
  //   call getSuccess
  // else
  //   call errorFn
  $.get(SERVER_URL, getSuccess).fail(failFunc);
}

/*
  The purpose of this function is to return the object which post returned.
  Since it's in a callback, it is guaranteed to run AFTER the post() request has fully
  completed, which is why it appears to just pass along data and not do anything. 
  @param returnedData - contains the JSON object returned by the server
  @return the same object that was passed in. 
  Author: Terry Goldsmith
*/
function postSuccess(returnedData) {
  return returnedData;
}

/*
  failFunc fires whenever a post or get request fails. It will print a distinct
  nessage to the console saying that there has been an error
  Author: Baxter Madore - Initial log statement
*/
function failFunc() {
  console.log("the server is likely not running. Sorry for that. The game " +
			  "should still function normally.");
}

/*
  The purpose of this function is to change the scoreboard when the server is functional, and pass along the 
  data from the server, while updating the local variables if possible. 
  @param returnedData contains the JSON object returned by the server, which holds the score in two variables
  @return returnedData the same data that was passed in! 
  
  Author: Terry Goldsmith
  Author: Caleb Bulmer: scoreDisplay element is updated using returnedData
*/
function getSuccess(returnedData) {
  document.getElementById("scoreDisplay").innerHTML =
    returnedData["corrects"] + "/" + returnedData["attempts"];
	numOfCorrect = returnedData["corrects"];
	numOfAttempts = returnedData["attempts"];
  return returnedData;
}
