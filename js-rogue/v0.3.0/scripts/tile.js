Game.Tile = function(properties) {
    
	properties = properties || {};
	Game.Glyph.call(this, properties);
	this._isWalkable = properties['isWalkable'] || false;
	
};

Game.Tile.extend(Game.Glyph);

// Property checkers
Game.Tile.prototype.isWalkable = function() {
    return this._isWalkable;
}

// Tilesets
Game.Tile.nullTile = new Game.Tile({})

Game.Tile.wallTile = new Game.Tile({
	character: '▢',
	foreground: 'goldenrod',
	isDiggable: true,
});

Game.Tile.floorTile = new Game.Tile({
    character: '.',
    isWalkable: true
});
