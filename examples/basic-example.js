function Pawn(colour) {
    Piece.call(this, identifiers.PAWN, colour);
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
    
    let newX = this.coordinates.x;
    let newY = this.coordinates.y + yDirection;
    
    if (newY >= 8 || newY < 0) {
        return;
    } else {
        return [new Coordinates(newX, newY)];
    }
}