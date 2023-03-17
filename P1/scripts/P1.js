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

//global variables
let correctAnswer, imageDroppedOn, allowGuesses, isCorrect;

/*allowGuesses is a boolean which states if the user is allowed to place the bear anywhere.
  it is reset to true at the start of the round, and made false when the bear is dropped*/

// initialize(); //runs at page load because it's not in a function

function initialize() {
  getRandomWords();
  allowGuesses = true;
}

/**
 * This function will check if the image dropped is correct and show the fail/win images.
 *
 * @param decision is the number of the image where the bear was dropped
 *
 * Author: JC Blais
 */
function checkAnswer(decision) {
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
  } else {
    isCorrect = false;

    //This will show the flowers on the right side of the grid
    document.getElementById("loseflower1").style.display = "block";
    document.getElementById("loseflower2").style.display = "block";
    document.getElementById("losetext").style.display = "block";

    //hides the volume button
    document.getElementById("volumeButton").style.display = "none";
    //hides the current word
    document.getElementById("currWord").style.display = "none";
    //shows the restart button
    document.getElementById("restart").style.display = "block";
    document.getElementById("restart").style.margin = "auto";
  }
}

/**
 * This function generates a random number between 0 and param max, exclusive.
 *
 * @param max is the number of which a random number can be picked from
 * @return a random int
 *
 * Author: JC Blais
 */
function randomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * This function stores the id of the element being dragged
 * in a storage area under the key "text". Target is the
 * element being dragged.
 *
 * @param event the event object being loaded for dragging
 *
 * Author: Caleb Bulmer
 */
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

/**
 * This functions suspends default behaviour for a
 * potential new position for the dragged element. Target
 * is the potential element where dragged element could be
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
    /* The idea here being that we could show every image before hiding
        a particular image. Can be expanded on once the grid seems to be
        good. */
    showAllImages();

    document.getElementById(event.target.id).style.opacity = 0;
  }
}

/**
 * This function is what will happen when the dragged
 * element is decided to be dropped in the position.
 *
 * @param event the event object being loaded for drop
 *
 * Author: Caleb Bulmer
 * Author: Ben Le: added code to show the bear when dropped
 */
function drop(event) {
  //

  event.preventDefault();

  // completely hide the image so when the bear appears it doesn't stretch
  $("#" + event.target.id).hide();
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

  //Needed to add this because sometimes the bear wouldn't disappear when the winstars we displayed
  document.getElementById("bearHolder").innerHTML = "";
}

/**
 * Displays all of the images. Makes the images come back after being
 * hidden on dragover or having the bear put on them
 * Author: Baxter Madore
 */

function showAllImages() {
  for (let count = 0; count < IMAGE_IDS.length; count++) {
    document.getElementById(IMAGE_IDS[count]).style.opacity = 1;
    document.getElementById(IMAGE_IDS[count]).style.display = "block";
  }
}

function playSound(correct) {
  if (correct) {
    document.getElementById("winsound").play();
  } else {
    document.getElementById("losesound").play();
  }
}

/**
 * This function gets a random word out of the array of possible words and displays it at the top of the screen
 * for user to play. Sets the answer to the correctAnswer.
 *
 * Author: Ben Le
 */
function getRandomWords() {
  let randomNum = randomInt(9);

  //for testing purposes
  console.log("randomWord=" + randomNum);
  console.log("./" + IMAGE_IDS[randomNum] + "Text.jpg");

  //sets the image to the image of the random word
  document.getElementById("currWordImg").src =
    "./" + IMAGE_IDS[randomNum] + "Text.jpg";

  correctAnswer = IMAGE_IDS[randomNum];
}

function playSound(correct) {
  if (correct) {
    document.getElementById("winsound").play();
  } else {
    document.getElementById("losesound").play();
  }
}

/**
 * This function restarts the table by setting allowGuesses
 * to true, rolling a new random int to represent as the
 * new word, and resetting the table to its original
 * position.
 *
 * Author: Caleb Bulmer
 * Author: Baxter Madore: Added code to return the bear to its holder
 * and restore images from under the bear
 * Author: Ben Le: Added code to display another random word
 */
function restartGame() {
  allowGuesses = true;

  document.getElementById("bearHolder").innerHTML =
    "<img src='bear.jpg' id='bear' ondragstart='drag(event)'>";

  //show the volume button
  document.getElementById("volumeButton").style.display = "block";

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

  //shows the new random word
  document.getElementById("currWord").style.display = "block";
  getRandomWords();
}
