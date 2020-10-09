function Pawn(colour) {
    Piece.call(this, identifiers.PAWN, colour);
    this.hasMoved = false;
}

Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.getMoves = function() {
    console.log('getMoves');
    const result = [];
    
    let direction;
    if (this.isWhite) {
        direction = 1;
    } else {
        direction = -1;
    }
    
    const newX = this.coordinates.x;
    const newY = this.coordinates.y + direction;
    
    if (newY < 0 || newY > 7) {
        return result;
    }
    
    const targetCoordinates =
        new Coordinates(newX, newY);
    
    result.push(targetCoordinates);
    
    return result;
}

Pawn.prototype.onMove = function(moveEvent) {
    if (moveEvent.from !== null) {
        this.hasMoved = true;
    }
}
