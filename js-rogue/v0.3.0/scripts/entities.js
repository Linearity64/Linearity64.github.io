Game.Mixins = {};												// Mixin namespace

Game.Mixins.Moveable = {										// Movable Mixin
    
	name: 'Moveable',											// Mixin Name
    
	tryMove: function(x, y, map) {								// Trymove function
        var tile = map.getTile(x, y);							// Get the tile
        if (tile.isWalkable()) {								// Check if it's walkable
            this._x = x;										// Change position
            this._y = y;
            return true;
        }
        return false;
    }
	
}

// Player template
Game.PlayerTemplate = {
	
    character: '@',
    foreground: 'white',
    background: 'black',
    mixins: [Game.Mixins.Moveable]
	
}