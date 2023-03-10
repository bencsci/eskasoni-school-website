//The images representing miqmaq words
const IMAGE_NAMES = ["aqq.jpg", "eliey.jpg",   "kesalk.jpg", 
                     "kil.jpg", "ltu.jpg",     "mijisi.jpg", 
                     "nin.jpg", "teluisi.jpg", "wiktm.jpg"] 
const IMAGE_PATH = "./"

//global variables
let correctAnswer,
    decision;


function startGame(){

}

/**
 * This function will check if the image dropped is correct and show the fail/win images.
 * 
 * @param decision is the number of the image where the bear was dropped
 * 
 * Author: JC Blais 
 */
function checkAnswer(decision){
    if(decision === correctAnswer){
        alert("I'm so proud");
        show.(winStar)  //This will show the win stars on the left side of the grid
    } else {
        alert("WRONG")
        show.(failFlower)  //This will show the flowers on the right side of the grid
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
function RandomInt(max){
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
 */
function allowDrop(event, image) {
    event.preventDefault();
    // console logs are to see what is happening while program runs.
    console.log(event.target.id);
    console.log("imageNum=" + imageNum);
    /* The idea here being that we could show every image before hiding
    a particular image. Can be expanded on once the grid seems to be
    good. */
    $(aqq.jpg).show();
    $(eliey.jpg).show();
    $(kesalk.jpg).show();
    $(kil.jpg).show();
    $(ltu.jpg).show();
    $(mijisi.jpg).show();
    $(nin.jpg).show();
    $(teluisi.jpg).show();
    $(wiktm.jpg).show();
    $(image).hide();
}

/**
 * This function is what will happen when the dragged
 * element is decided to be dropped in the position. 
 * 
 * @param event the event object being loaded for drop
 * 
 * Author: Caleb Bulmer
 */
function drop(event) {
    event.preventDefault();
  
    // contains the id of the element that was being dragged
    let data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
  }
