
var wins = 0,
  losses = 0,
  guessed = [],
  currentWord = [],
  displayWordArray = [],
  displayWord = "",
  guessesAllowed = 8,
  wordIndex = 0, //I don't want to get the first word every time
  increment = 2,
  gameStatus = "Press any key to start",
  wrongGuesses = 0,
  firstTime = true,
  wordList = ["BUDWEISER", "LEGEND", "CORONA", "MICHELOB", "MILLER", "CHEDDAR", "GOUDA", "PROVOLONE", "ASIAGO", "MUENSTER",
    "PEPPERONI", "SAUSAGE", "ONION", "BACON", "JALAPENO", "MARGARITA", "COSMOPOLITAN", "MARTINI", "DAIQUIRI", "MUDSLIDE"];

// Create variables that hold references to the places in the HTML where we want to display things.
var directionsText = document.getElementById("directions-text");
var userChoiceText = document.getElementById("userchoice-text");
var currentWordText = document.getElementById("currentword-text");
var guessedText = document.getElementById("guessed-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var gameStatusText = document.getElementById("gameStatus-text");


//function will return true if a letter.
function isLetter(charEntered) {
  return typeof charEntered === "string" && charEntered >= "A" && charEntered <= "Z";
}

//function will return true if letter has already been guessed.
function alreadyGuessed(guessed, charEntered) {
  var retvalue = false;
  if (guessed.indexOf(charEntered) > -1) {
    retvalue = true;
  }
  else {
    retvalue = updateDisplayWord(guessed, guessed.length, charEntered);
    retvalue = false;
  }
  return retvalue;
}

//this will initial the display word array to _
function wordToArray(currentWord) {
  var returnWord = [];
  for (var i = 0; i < currentWord.length; i++) {
    returnWord[i] = currentWord.substr(i, 1);
  }
  return returnWord;
}

//function will return true if the guessed letter is in the string.
//it will also call the routine to update the array with the word.
function letterInWord(currentWord, charEntered) {
  var isFound = false;
  var isTrue = true;
  var charPosition = 0;
  //need to loop through while the letter is in the word, may be in multiple times.
  while (isTrue) {
    charPosition = currentWord.indexOf(charEntered, charPosition);
    if (charPosition > -1) {
      isFound = true;
      var updated = updateDisplayWord(displayWordArray, charPosition, charEntered);
      charPosition = charPosition + 1;
    }
    else {
      isTrue = false;
    }
  }
  return isFound;
}

//function will update the display word if correct
function updateDisplayWord(alist, charPosition, charEntered) {
  alist[charPosition] = charEntered;
  return true;
}

//function will convert array to display word if correct
function getDisplayWord(alist) {
  var returnWord = "";
  for (var i = 0; i < alist.length; i++) {
    returnWord = returnWord + " " + alist[i];
  }
  return returnWord;
}

//function will get an array value for a word in the list.  Sequence is where to start in the array.
//if sequence = 0 then get a random number within the array length
function getWord(alist, sequence, increment) {
  if (sequence === 0) {
    return Math.floor(Math.random() * (alist.length - 1));  //random starting number
  }
  if ((sequence + increment) > alist.length) {
    return increment;
  }
  else {
    return sequence + increment;
  }
}

function initializeGame() {
    //get a word
    wordIndex = getWord(wordList, wordIndex, increment);
    wrongGuesses = 0;
    currentWord = wordToArray(wordList[wordIndex]);
    displayWordArray = currentWord.slice();   //duplicate the word array
    displayWordArray.fill("_");   //replace all values with _
    displayWord = getDisplayWord(displayWordArray); //convert array to word for displaying
    gameStatus = "";
    return true;
}
  // Display the user and computer guesses, and wins/losses/ties.
function updateDisplay() {
  //directionsText.textContent = "Press any key to get ";
  userChoiceText.textContent = "Wrong Guesses Remaining: " + (guessesAllowed-wrongGuesses);
  currentWordText.textContent = "Word to Guess: " + displayWord;
  guessedText.textContent = "Letters Guessed: " + getDisplayWord(guessed);
  winsText.textContent = "wins: " + wins;
  lossesText.textContent = "losses: " + losses;
  gameStatusText.textContent = "Guess Results: " + gameStatus;
  return true;
}

var returnValue = true;
returnValue = (initializeGame());
returnValue = (updateDisplay());

// This function is run whenever the user presses a key
document.onkeyup = function (event) {
  
  // Determines which key was pressed.

  var userGuess = event.key;
  userGuess = userGuess.toUpperCase();
  //if the current word is null, initilize everything

  
  //if it's the first game first keystroke, don't process the letter.
//  if (!firstTime) {
    if (!isLetter(userGuess)) {
      gameStatus = "Guess a letter dummy";
    }
    else if (alreadyGuessed(guessed, userGuess)) {
      gameStatus = "You've already guessed " + userGuess + ", try again!";
    }
    else if (letterInWord(currentWord, userGuess)) {
       displayWord = getDisplayWord(displayWordArray);
       gameStatus =  "Correct - Good job!";
    }
    else {
      wrongGuesses++;
      gameStatus =  "Not in the word - try again";
    }
    if (wrongGuesses >= guessesAllowed) {
      gameStatus = "You LOSE!";
      displayWordArray = [];
      guessed = [];
      losses++;
    }
    else if (!letterInWord(displayWordArray, '_')) {
      gameStatus = "You WIN!";
      displayWordArray = [];
      guessed = [];
      wins++;
    }
 
  returnValue = (updateDisplay());

  gameStatusText.textContent = "Game Status: " + gameStatus;
  
  if (displayWordArray.length < 1) {
    //get a new word
    returnValue = (initializeGame());
    directionsText.textContent = "Press any key to start a new game ";
  }
  
 
};