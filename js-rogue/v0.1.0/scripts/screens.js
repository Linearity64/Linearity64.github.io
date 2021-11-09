Game.Screen = {};																// Arrays of screens

// Initial start screen
Game.Screen.startScreen = {
    
	enter: function() {console.log("Entered start screen.");},					// Enter function
    
	exit: function() {console.log("Exited start screen.");},					// Exit function
    
	render: function(display) {													// Render function
        display.drawText(1,1, "%c{yellow}Javascript Roguelike with ROT.js");	// Print out notification on screen
        display.drawText(1,2, "Press [Enter] to start");
		display.drawText(1,4, "Snapshot v0.1.0");
		display.drawText(1,5, "[4/11/21]");
		display.drawText(1,6, "By Linearity64");
    },
	
    handleInput: function(inputType, inputData) {								// Input handler
        if (inputType === 'keydown') {											// Keydown input handler
            if (inputData.keyCode === ROT.KEYS.VK_RETURN) {						// Check for [Enter]
                Game.switchScreen(Game.Screen.playScreen);						// Switch screen to playScreen
            }
        }
    }
	
}

// Main playing screen
Game.Screen.playScreen = {
	
	_map : null,																// Internal Map Array
    
	enter: function() {  
		
		var map = [];
		for (var x = 0; x < options.width; x++) {
			// Create the nested array for the y values
			map.push([]);
			// Add all the tiles
			for (var y = 0; y < options.height; y++) {
				map[x].push(Game.Tile.nullTile);
			}
		}
		
		// Setup the map generator
		var generator = new ROT.Map.Uniform(80, 48, {roomWidth: [4,8], roomHeight: [4,8], roomDugPercentage: 0.15});
		
		// Smoothen it one last time and then update our map
		generator.create(function(x,y,v) {
			if (v === 0) {
				map[x][y] = Game.Tile.floorTile;
			} else {	
				map[x][y] = Game.Tile.wallTile;
			}
		});
		
		// Create our map from the tiles
		this._map = new Game.Map(map);
		
	},
    
	exit: function() {console.log("Exited play screen.");},						// Exit function
    
	render: function(display) {
    // Iterate through all map cells
    for (var x = 0; x < this._map.getWidth(); x++) {
        for (var y = 0; y < this._map.getHeight(); y++) {
            // Fetch the glyph for the tile and render it to the screen
            var glyph = this._map.getTile(x, y).getGlyph();
            display.draw(x, y,
                glyph.getChar(), 
                glyph.getForeground(), 
                glyph.getBackground());
        }
    }
},
	
    handleInput: function(inputType, inputData) {
        if (inputType === 'keydown') {
            if (inputData.keyCode === ROT.KEYS.VK_RETURN) {
                Game.switchScreen(Game.Screen.winScreen);
            } else if (inputData.keyCode === ROT.KEYS.VK_ESCAPE) {
                Game.switchScreen(Game.Screen.loseScreen);
            }
        }    
    }
	
}

// Define our winning screen
Game.Screen.winScreen = {
    
	enter: function() {console.log("Entered win screen.");},
    
	exit: function() {console.log("Exited win screen.");},
    
	render: function(display) {
        // Render our prompt to the screen
        for (var i = 0; i < 22; i++) {
            // Generate random background colors
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            var background = ROT.Color.toRGB([r, g, b]);
            display.drawText(2, i + 1, "%b{" + background + "}You win!");
        }
    },
	
    handleInput: function(inputType, inputData) {
        // Nothing to do here      
    }
	
}

// Define our winning screen
Game.Screen.loseScreen = {
    
	enter: function() {console.log("Entered lose screen.");},
    
	exit: function() {console.log("Exited lose screen.");},
    
	render: function(display) {
        // Render our prompt to the screen
        for (var i = 0; i < 22; i++) {
            display.drawText(2, i + 1, "%b{red}You lose! :(");
        }
    },
	
    handleInput: function(inputType, inputData) {
        // Nothing to do here      
    }
	
}