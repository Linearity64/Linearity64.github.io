
// Extend function
Object.prototype.extend = function(a) {
	this.prototype = Object.create(a.prototype);
	this.prototype.constructor = this;
	return this;
};

// Onload, run this
window.onload = function() {											
	Game.init();															// Initialize Game object
	document.body.appendChild(Game.getDisplay().getContainer());			// Create a container
	Game.switchScreen(Game.Screen.startScreen);								// Go to start screen
}

//Display options
var displayOptions = {
    width: 80,																// Display width
    height: 48,																// Display height
    fontSize: 14,															// Font size
    forceSquareRatio: true													// To force square tiles instead of rectangular
}

var mapOptions = {
	width: 500,
	height: 500,
	roomWidth: [4,8],														// Room width [min,max]
	roomHeight: [4,8],														// Room height [min, max]
	roomDugPercentage: 0.2,													// Percentage of map dug
	timeLimit: 5000															// Timeout in case function locks up
}

// Main Game object
var Game = {
	
    _display: null,															// Local display variable
	_currentScreen: null,													// Stores currentscreen data
	_screenWidth: 80,														// Stores screen width (viewport)
	_screenHeight: 48,														// Stores screen height (viewport)
	
	//Initialization
    init: function() {
		
        this._display = new ROT.Display(displayOptions);

        var game = this;													// Local instance to refer to this Game object
        var bindEventToScreen = function(event) {							// Helper function to bind events to the screen
            window.addEventListener(event, function(e) {					// Standard JS event listener
                if (game._currentScreen !== null) {							// If currentScreen is NOT null,
                    game._currentScreen.handleInput(event, e);				//	call handleInput function,
                    game._display.clear();									//	clear the screen,
                    game._currentScreen.render(game._display);				//	then render the screen.
                }
            });
        }
		
        bindEventToScreen('keydown');										// Call the helper function for keydown events
		
    },
	
	//Display wrapper
    getDisplay: function() {
        return this._display;												// Return the display
    },
	
	getScreenWidth: function() {
		return this._screenWidth;											// Return the screenWidth
	},
	
	getScreenHeight: function() {
		return this._screenHeight;											// Return the screenHeight
	},
	
	//Screen switching function
	switchScreen: function(screen) {
		
		if (this._currentScreen !== null) {									// If there was a screen before:
			this._currentScreen.exit();										// Tell the screen to exit
		}
		
		this.getDisplay().clear();											// Clear the display
		
		this._currentScreen = screen;										// Update _currentScreen
		if (this._currentScreen) {											// Make sure _currentScreen is empty
			this._currentScreen.enter();									// Notify it we entered
			this._currentScreen.render(this._display);						// And then render it
		}	
		
	}
	
}