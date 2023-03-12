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
let correctAnswer, decision, allowGuesses;

function startGame() {
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
    alert("I'm so proud");
    show(winStar); //This will show the win stars on the left side of the grid
  } else {
    alert("WRONG");
    show(failFlower); //This will show the flowers on the right side of the grid
  }
}

/**
 * This function generates a random number between 0 and param max.
 *
 * @param max is the number of which a random number can be picked from
 * @return a random int
 *
 * Author: JC Blais
 */
function RandomInt(max) {
  return Math.floor(math.random() * max);
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
 * Author: Baxter Madore: moved the code for showing images to a seperate function
 */
function allowDrop(event, image) {
  event.preventDefault();
  // console logs are to see what is happening while program runs.
  console.log(event.target.id);
  console.log("imageNum=" + image.getElementById);

  /* The idea here being that we could show every image before hiding
    a particular image. Can be expanded on once the grid seems to be
    good. */
  showAllImages();

  document.getElementById(event.target.id).style.opacity = 0;
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
  event.preventDefault();

  // completely hide the image so when the bear appears it doesn't stretch
  $("#" + event.target.id).hide();
  // makes the hidden bear visible
  document.getElementById(event.target.id + "Bear").style.display = "block";

  // contains the id of the element that was being dragged
  let data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));
}

/**
 * Displays all of the images. Makes the images come back after being
 * hidden on dragover
 * Author: Baxter Madore
 */

function showAllImages() {
  for (let count = 0; count < IMAGE_IDS.length; count++) {
    document.getElementById(IMAGE_IDS[count]).style.opacity = 1;
  }
}

function playSound(correct) {
  if (correct) {
    document.getElementById("winsound").play();
  } else {
    document.getElementById("losesound").play();
  }
}
