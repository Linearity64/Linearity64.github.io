Game.Map = function(tiles) {
    this._tiles = tiles;
    this._width = tiles.length;											// Use tiles array length to get width and height
    this._height = tiles[0].length;										// Pretty clever actually
};

// Standard getters
Game.Map.prototype.getWidth = function() {
    return this._width;
};
Game.Map.prototype.getHeight = function() {
    return this._height;
};

// Gets the tile for a given coordinate set
Game.Map.prototype.getTile = function(x, y) {
	
    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {		// Check if position is inbounds
        return Game.Tile.nullTile;										// If no, return null tile
    } else {
        return this._tiles[x][y] || Game.Tile.nullTile;					// If yes, return the tile OR nulltile in case tile is invalid
    }
	
};

// Get a random floor position
Game.Map.prototype.getRandomFloorPosition = function() {
    
	var x, y;															// Temporary variables
    do {																// Do
        x = Math.floor(Math.random() * this._width);					//	Pick a random x position
        y = Math.floor(Math.random() * this._width);					//	Pick a random y position
    } while(this.getTile(x, y) != Game.Tile.floorTile);					//	Keep doing it while the tile at x,y is not floor
    return {x: x, y: y};												// Return the valid position
	
}