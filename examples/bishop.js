const Bishop = ((document) => {
    const board = document.querySelector('chess-board');
    
    function Bishop(colour) {
        Queen.call(this, colour);
        this.identifier = identifiers.BISHOP;
    }
    
    Bishop.prototype = Object.create(Queen.prototype);
    Bishop.prototype.constructor = Bishop;

    Bishop.prototype.canMoveStraight = false;
    
    for (let x of [2, 5]) {
        board.getTileAt(new Coordinates(x, 0)).piece = new Bishop(colours.WHITE);
        board.getTileAt(new Coordinates(x, 7)).piece = new Bishop(colours.BLACK);
    }
    
    return Bishop
})(document);