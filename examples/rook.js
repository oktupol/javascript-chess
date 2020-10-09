const Rook = ((document) => {
    const board = document.querySelector('chess-board');
    
    function Rook(colour) {
        Queen.call(this, colour);
        this.identifier = identifiers.ROOK;
        this.hasMoved = false;
    }
    
    Rook.prototype = Object.create(Queen.prototype);
    Rook.prototype.constructor = Rook;

    Rook.prototype.canMoveDiagonally = false;

    Rook.prototype.onMove = function (moveEvent) {
        if (moveEvent.from) {
            this.hasMoved = true;
        }
    }
    
    for (let x of [0, 7]) {
        board.getTileAt(new Coordinates(x, 0)).piece = new Rook(colours.WHITE);
        board.getTileAt(new Coordinates(x, 7)).piece = new Rook(colours.BLACK);
    }
    
    return Rook;
})(document);