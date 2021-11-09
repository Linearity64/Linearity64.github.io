Game.Screen = {};																				// Arrays of screens

// Initial start screen
Game.Screen.startScreen = {
    
	enter: function() {console.log("Entered start screen.");},									// Enter function
    
	exit: function() {console.log("Exited start screen.");},									// Exit function
    
	render: function(display) {																	// Render function
        display.drawText(2,2, "%c{yellow}Javascript Roguelike with ROT.js");					// Print out text on screen
        display.drawText(2,3, "Press %c{white}[Enter]%c{} to start");
		display.drawText(2,6, "%c{hotpink}Snapshot v0.3.0");
		display.drawText(2,7, "[8/11/21]"); 	
		display.drawText(2,8, "By %c{lightskyblue}Linearity64");
		
		// Changelogs
		
		display.drawText(2,11, "%c{white}Changelogs");
		display.drawText(2,13, "%c{lime}[Major]:");
		display.drawText(2,14, ">Collision!");
		display.drawText(2,15, ">Implemented Entity system (Player, Mixins)");
		display.drawText(2,17, "%c{paleturquoise}[Minor]:");
		display.drawText(2,18, ">Random player spawn");
		display.drawText(2,19, ">Refactored glyph system");
		display.drawText(2,20, ">Fixed miseplling");
		
		
		// Border
		
		var screenWidth = Game.getScreenWidth();
		var screenHeight = Game.getScreenHeight();
		
		for(let x = 0; x < screenWidth; x++){
			for(let y = 0; y < screenHeight; y++){
				if(x == 0 || x == screenWidth - 1 || y == 0 || y == screenHeight - 1){
					display.draw(x, y, '%', 'goldenrod');
				}
			}
		}
		
    },
	
    handleInput: function(inputType, inputData) {												// Input handler
        if (inputType === 'keydown') {															// Keydown input handler
            if (inputData.keyCode === ROT.KEYS.VK_RETURN) {										// Check for [Enter]
                Game.switchScreen(Game.Screen.playScreen);										// Switch screen to playScreen
            }
        }
    }
	
}

// Main playing screen
Game.Screen.playScreen = {
	
	_map : null,																				// Internal Map Array
	_player: null,																				// Player object to keep positions
	
	// Movement function
	move: function(dx,dy) {
		
		var newX = this._player.getX() + dx;													// New x-position
        var newY = this._player.getY() + dy;													// New y-position
        this._player.tryMove(newX, newY, this._map);											// Try to move
		
	},
    
	// Upon entering
	// Generate a new random map according to mapOptions, with rot.js's Map function
	enter: function() {
		
		var map = [];																			// Temporary map array
		var mapWidth = mapOptions.width;														// Get width and height
		var mapHeight = mapOptions.height;														//	for dungeon generation later
		
		for (var x = 0; x < mapWidth; x++) {
			map.push([]);																		// Nested arrays
			for (var y = 0; y < mapHeight; y++) {
				map[x].push(Game.Tile.nullTile);												// Flush the array with null tiles
			}
		}
		
		// Setup the map generator
		var generator = new ROT.Map.Uniform(mapWidth, mapHeight, mapOptions);					// THE map generator function
		
		// Generate
		generator.create(function(x,y,v) {														// Assign tileset to tile value
			if (v === 0) {
				map[x][y] = Game.Tile.floorTile;												// Floor
			} else {	
				map[x][y] = Game.Tile.wallTile;													// Wall
			}
		});
		
		this._map = new Game.Map(map);															// Create a map object from tiles
		
		this._player = new Game.Entity(Game.PlayerTemplate);
        var position = this._map.getRandomFloorPosition();
        this._player.setX(position.x);
        this._player.setY(position.y);
		
	},
    
	// Upon exit
	// Pretty much do nothing
	exit: function() {console.log("Exited play screen.");},										// Exit function
    
	// Rendering function
	// Create a 'viewport' (viewable, scrollable screen)
	// Draw through the viewport
	// Render the player/cursor
	render: function(display) {
		
        var screenWidth = Game.getScreenWidth();												// Get screenWidth and screenHeight for viewport
        var screenHeight = Game.getScreenHeight();
		
        var topLeftX = Math.max(0, this._player.getX() - (screenWidth / 2));					// Making sure we don't render out of left bounds
        topLeftX = Math.min(topLeftX, this._map.getWidth() - screenWidth);						// Making sure we don't render out of right bounds
        var topLeftY = Math.max(0, this._player.getY() - (screenHeight / 2));					// Making sure we don't render out of top bounds
        topLeftY = Math.min(topLeftY, this._map.getHeight() - screenHeight);					// Making sure we don't render out of bottom bounds
        for (var x = topLeftX; x < topLeftX + screenWidth; x++) {								// Iterate through the entire viewport
            for (var y = topLeftY; y < topLeftY + screenHeight; y++) {							//	(viewable map)
                
				var tile = this._map.getTile(x, y);												// Get the tile in that position
				
				display.draw(																	// Draw the tile
                    x - topLeftX,
                    y - topLeftY,
                    tile.getChar(), 
                    tile.getForeground(), 
                    tile.getBackground()
				);
				
            }
        }
		
        display.draw(																			// Draw the player cursor
            this._player.getX() - topLeftX, 
            this._player.getY() - topLeftY,    
            this._player.getChar(), 
            this._player.getForeground(), 
            this._player.getBackground()
        );
			
    },
	
	// Input handler function
    handleInput: function(inputType, inputData) {
        
		if (inputType === 'keydown') {															// Check for input type (keyDown is universal, keyPress is only for alphanumeric)
			
            if (inputData.keyCode === ROT.KEYS.VK_RETURN) {										// If [Enter]
                Game.switchScreen(Game.Screen.winScreen);										//	Go to winscreen
            } else if (inputData.keyCode === ROT.KEYS.VK_ESCAPE) {								// If [Escape]
                Game.switchScreen(Game.Screen.loseScreen);										//	Go to losescreen
            }
			
			if (inputData.keyCode === ROT.KEYS.VK_UP){											// If [Up]
				this.move(0,-1);																//	Move up
			} else if (inputData.keyCode === ROT.KEYS.VK_DOWN){									// If [Down]
				this.move(0,1);																	//	Move down
			} else if (inputData.keyCode === ROT.KEYS.VK_LEFT){									// If [Left]
				this.move(-1,0);																//	Move left
			} else if (inputData.keyCode === ROT.KEYS.VK_RIGHT){								// If [Right]
				this.move(1,0);																	//	Move right
			}
        }   
		
    }
	
}

// Win screen
Game.Screen.winScreen = {
    
	// Upon entering
	// Do nothing
	enter: function() {console.log("Entered win screen.");},
    
	// Upon exiting
	// Do nothing
	exit: function() {console.log("Exited win screen.");},
	
	// Rendering function
	render: function(display) {
		
        for (var i = 0; i < 22; i++) {															// Iterate from line 0 to 21
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            var background = ROT.Color.toRGB([r, g, b]);										// Generate random color
            display.drawText(2, i + 1, "%b{" + background + "}You win!");						// Print the text on screen
        }
		
		display.drawText(2, 30, "Press [Space] to get back to Start screen");
    },
	
	// Input handler
	// Returns to start screen by pressing [Space]
    handleInput: function(inputType, inputData) {
        
		if(inputType === 'keydown'){
			
			if(inputData.keyCode === ROT.KEYS.VK_SPACE){
				console.log("here");
				Game.switchScreen(Game.Screen.startScreen);
			}
			
		}
    }
	
}

// Lose screen
Game.Screen.loseScreen = {
    
	// Upon entering
	// Do nothing
	enter: function() {console.log("Entered lose screen.");},
    
	// Upon exiting
	// Do nothing
	exit: function() {console.log("Exited lose screen.");},
    
	// Rendering function
	render: function(display) {
        for (var i = 0; i < 22; i++) {															// Iterate from line 0 to 21
            display.drawText(2, i + 1, "%b{red}You lose! :(");									// Print the text on screen
        }
    },
	
	// Input handler
	// Cuttently has nothing
    handleInput: function(inputType, inputData) {
        // Nothing to do here      
    }
	
}