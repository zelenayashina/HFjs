var view = {
  displayMessage: function(msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  }
};

var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,

  ships: [{ locations: ["06", "16", "26"], hits: ["", "", ""] },
          { locations: ["24", "34", "44"], hits: ["", "", ""] },
          { locations: ["10", "11", "12"], hits: ["", "", ""] }
  ],

  fire: function(guess) {

    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      locations = ship.locations;
      var index = locations.indexOf(guess);
      if (index >=0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view,displayMessage("HIT!");
        if (this.isSunk(ship)) {
          view.displayMessage("You sank my ship!");
          this.shipsSunk++;
        }
        return true;
      }
      
    }
    view.displayMiss(guess);
    view.displayMessage("MISSED");
    return false;
  },
  isSunk: function(ship) {
    for(var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  }
};

function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

  if (guess === null || guess.length !== 2) {
    alert("wrong target");
  } else {
    firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);

    if (isNan(row) || isNaN(column)) {
      alert("wrong target");
    } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
      alert("wrong target");
    } else {
      return row + column;
    }
    
  }
  return null;
};

var controller = {
  guesses: 0, 

  processGuess: function(guess) {
    var location = parseGuess(guess);
    if(location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage("You sank them in " + this.guesses + " guesses");
      }
    }
  }
};

function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
};

function handleFireButton() {
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value;
  controller.processGuess(guess);

  guessInput.value = "";
  
};

generateShipLocations: function() {
  var locations;
  for (var i = 0; i < this.numShips; i++) {
    do {
        locations = this.generateShip();
    } while (this.collision(locations));
    this.ships[i].locations = locations;
  }
}

window.onload = init;


