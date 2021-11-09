
// Onload, run this
window.onload = function() {											
	Game.init();														// Initialize Game object
	document.body.appendChild(Game.getDisplay().getContainer());		// Create a container
	Game.switchScreen(Game.Screen.startScreen);							// Go to start screen
}

//Display options
var options = {
    width: 80,															// Display width
    height: 48,															// Display height
    fontSize: 12,														// Font size
    forceSquareRatio:true												// To force square tiles instead of rectangular
}

// Main Game object
var Game = {
	
	//Create display and currentScreen variable
    _display: null,	
	_currentScreen: null,
	
	//Initialization
    init: function() {
        
		this._display = new ROT.Display(options);						// Create a new display, put it in _display var
		
		var game = this; 												// Local instance to refer to this Game object
		var bindEventToScreen = function(event) {						// Helper function to bind events to the screen
			window.addEventListener(event, function(e) {				// Standard JS event listener
            if (game._currentScreen !== null) {							// Make sure _currentScreen is not null
                game._currentScreen.handleInput(event, e);				// Send the input and the datatype to the screen
            }
			});
		}
		
		bindEventToScreen('keydown');									// Bind keyboard input events
		bindEventToScreen('keyup');
		bindEventToScreen('keypress');
		
    },
	
	//Display wrapper
    getDisplay: function() {
        return this._display;											// Return the display
    },
	
	//Screen switching function
	switchScreen: function(screen) {
		
		if (this._currentScreen !== null) {								// If there was a screen before:
			this._currentScreen.exit();									// Tell the screen to exit
		}
		
		this.getDisplay().clear();										// Clear the display
		
		this._currentScreen = screen;									// Update _currentScreen
		if (this._currentScreen) {										// Make sure _currentScreen is empty
			this._currentScreen.enter();								// Notify it we entered
			this._currentScreen.render(this._display);					// And then render it
		}	
		
	}
	
}