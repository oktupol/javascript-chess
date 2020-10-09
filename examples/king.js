const King = ((document) => {
    const board = document.querySelector('chess-board');
    
    function King(colour) {
        Queen.call(this, colour);
        this.identifier = identifiers.KING;
        this.hasMoved = false;
    }
    
    King.prototype = Object.create(Queen.prototype);
    King.prototype.constructor = King;

    King.prototype.maxMoveDistance = 1;
    
    King.prototype.getMoves = function () {
        const result = Queen.prototype.getMoves.call(this);
        
        addCastlingMoves.call(this, result);

        return result;
    }
    
    function addCastlingMoves(result) {
        if (this.hasMoved) {
            return;
        }
        
        oneSide: for (let x of [0, 7]) {
            const rook = board.getPieceAt(new Coordinates(x, this.coordinates.y));
            
            if (rook instanceof Rook && rook.colour === this.colour && !rook.hasMoved) {
                const xStart = Math.min(x, this.coordinates.x) + 1;
                const xEnd = Math.max(x, this.coordinates.x) - 1;
                
                for (let x2 = xStart; x2 <= xEnd; x2++) {
                    if (board.getPieceAt(new Coordinates(x2, this.coordinates.y))) {
                        continue oneSide;
                    }
                }
                
                const targetX = x === 0 ? 2 : 6;
                result.push(new Coordinates(targetX, this.coordinates.y));
            }
        }
    }

    King.prototype.onMove = function (moveEvent) {
        if (moveEvent.from) {
            this.hasMoved = true;
            
            // Castling move
            if (Math.abs(moveEvent.to.x - moveEvent.from.x) === 2) {
                const queenside = moveEvent.to.x === 2;
                const rookX = queenside ? 0 : 7;
                const targetRookX = queenside ? 3 : 5;

                const rook = board.getPieceAt(new Coordinates(rookX, moveEvent.to.y));
                const targetTile = board.getTileAt(new Coordinates(targetRookX, moveEvent.to.y));
                targetTile.piece = rook;
            }
        }
    }
    
    board.getTileAt(new Coordinates(4, 0)).piece = new King(colours.WHITE);
    board.getTileAt(new Coordinates(4, 7)).piece = new King(colours.BLACK);
    
    return King;
})(document);