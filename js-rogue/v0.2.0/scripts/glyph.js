Game.Glyph = function(chr, foreground, background) {
	
    this._char = chr || ' ';									// Pass value into local variable
    this._foreground = foreground || 'white';					// If no value is passed (NULL), assign default value
    this._background = background || 'black';

};

// Create standard getters for glyphs
Game.Glyph.prototype.getChar = function(){ 
    return this._char; 
}

Game.Glyph.prototype.getBackground = function(){
    return this._background;
}

Game.Glyph.prototype.getForeground = function(){ 
    return this._foreground; 
}