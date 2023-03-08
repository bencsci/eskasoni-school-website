//The images representing miqmaq words
const IMAGE_NAMES = ["aqq.jpg", "eliey.jpg",   "kesalk.jpg", 
                     "kil.jpg", "ltu.jpg",     "mijisi.jpg", 
                     "nin.jpg", "teluisi.jpg", "wiktm.jpg"] 
const IMAGE_PATH = "./"

//global variables
var correctAnswer,
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
