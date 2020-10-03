function Pawn(colour) {
    Piece.call(this, symbols.PAWN, colour);
}
Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.getMoves = function () {
    let yDirection = 0;
    switch(this.colour) {
        case colours.WHITE:
            yDirection = 1;
            break;
        case colours.BLACK:
            yDirection = -1;
            break;
    }
    
    let newX = this._coordinates.x;
    let newY = this._coordinates.y + yDirection;
    
    if (newY >= 8 || newY < 0) {
        return;
    } else {
        return [new Coordinates(newX, newY)];
    }
}

function CornerJumper(colour) {
    Piece.call(this, {
        [colours.BLACK]: '😂',
        [colours.WHITE]: '😭'
    }, colour);
}
CornerJumper.prototype = Object.create(Piece.prototype);
CornerJumper.prototype.constructor = CornerJumper;

CornerJumper.prototype.getMoves = function () {
    return [
        new Coordinates(0, 0),
        new Coordinates(0, 7),
        new Coordinates(7, 7),
        new Coordinates(7, 0)
    ];
}

let pawn1 = new Pawn(colours.WHITE);
board.getTileAt(new Coordinates(3, 1)).piece = pawn1;

let pawn2 = new Pawn(colours.BLACK);
board.getTileAt(new Coordinates(4, 6)).piece = pawn2;

let cornerJumper = new CornerJumper(colours.BLACK);
board.getTileAt(new Coordinates(5, 5)).piece = cornerJumper;