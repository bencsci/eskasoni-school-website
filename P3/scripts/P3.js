//The images representing miqmaq words, as their HTML ids.
//If you need the file names, just append ".jpg" to any of them
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

const SERVER_URL = "http://ugdev.cs.smu.ca:3737";

//global variables
let correctAnswer,
  imageDroppedOn,
  allowGuesses,
  isCorrect,
  numOfCorrect = 0,
  numOfAttempts = 0;


/*allowGuesses is a boolean which states if the user is allowed to place the bear anywhere.
  it is reset to true at the start of the round, and made false when the bear is dropped.*/

// initialize(); //runs at page load because it's not in a function

function initialize() {
  //shows the start score
  document.getElementById("scoreHolder").style.display = "none";
  document.getElementById("clickYourScore").style.display = "none";

  //shows the current word and volume button
  document.getElementById("volumeButton").style.display = "block";
  document.getElementById("currWord").style.display = "block";

  getRandomWords();
  allowGuesses = true;
}

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
  //TODO: post the new score to the server
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
 * potential new position for the bear. Target
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
    // console logs are to see what is happening while program runs.
    console.log(event.target.id);
    showAllImages();

    document.getElementById(event.target.id).style.opacity = 0;
  }
}

/**
 * This function will be called when the dragged
 * element is decided to be dropped in the position.
 *
 * @param event the event object being loaded for drop
 *
 * Author: Caleb Bulmer
 * Author: Ben Le: added code to show the bear when dropped
 * Author: Baxter Madore: Removed jQuery dependency
 */
function drop(event) {
  event.preventDefault();

  // completely hide the image so when the bear appears it doesn't stretch
  document.getElementById(event.target.id).style.display = "none";
  imageDroppedOn = event.target.id;
  console.log("ImgDroppedON: " + imageDroppedOn);

  // makes the hidden bear visible
  document.getElementById(event.target.id + "Bear").style.display = "block";

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
  let randomNum = randomInt(9);

  //for testing purposes
  console.log("randomWord=" + randomNum);
  console.log("./images/" + IMAGE_IDS[randomNum] + "Text.jpg");

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
  allowGuesses = true;

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

  updateScoreboard(); //do we just change this to window.reload() ? 
}

/**
 * This function updates and shows the updated scoreboard.
 * Ben Le: main logic and function
 */
function updateScoreboard() {
  //updates the scoreboard
  document.getElementById("scoreDisplay").innerHTML =
    numOfCorrect + "/" + totalGuesses;

  //shows the updated score
  document.getElementById("scoreHolder").style.display = "block";
  document.getElementById("clickYourScore").style.display = "block";

  // changes the onclick function from initialize() to continueScore()
  document
    .getElementById("clickYourScore")
    .setAttribute("onClick", "javascript: continueGame();");
}

/**
 * This fuction rollis a new random int to represent as the
 * new word, and displays the new word.
 * Ben Le: main logic and function
 *
 */
function continueGame() {
  //hides
  document.getElementById("scoreHolder").style.display = "none";
  document.getElementById("clickYourScore").style.display = "none";

  document.getElementById("volumeButton").style.display = "block";
  document.getElementById("currWord").style.display = "block";

  //shows the new random word
  document.getElementById("currWord").style.display = "block";
  getRandomWords();
}


/****************************************************** SERVER CODE ***************************/

/*
  The purpose of this function is to POST a JSON object to the
  server at the relative endpoint /myPost.

  Author: Terry Goldsmith
*/
function post() {
  console.log("we be posting");
  // define the object to be posted
  let score = { corrects: numOfCorrects, attempts: numOfAttempts };

  // if (the middleware for this endpoint ran without error)
  //   call successFn
  // else
  //   call errorFn
  $.post(SERVER_URL, score, successFn).fail(errorFn);
}

/*
  The purpose of this function is to GET a JSON object from the
  server at the relative endpoint /myGet.

  Author: Terry Goldsmith
*/
function get() {
  console.log("we be getting")	
  // attempt to GET the score back from the server. 
  // if (the middleware for this endpoint ran without error)
  //   call successFn
  // else
  //   call errorFn
  $.get(SERVER_URL, successFn).fail(errorFn);
}

/*
  The purpose of this function is to log the JSON object received
  from the server.

  returnedData - contains the JSON object returned by the server

  Author: Terry Goldsmith
*/

function successFn(returnedData) {
  console.log("yay the success function! don't know what exactly succeeded but the function did!")
  console.log(returnedData);
}

/*
  The purpose of this function is to log the error.

  err - the error object returned by the server

  Author: Terry Goldsmith
*/
function errorFn(err) {
  console.log("oh no it crashed and failed error oh no!!!!!!!!!!!")
  console.log(err.responseText);
}