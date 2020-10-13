const Pawn = ((document) => {
    const board = document.querySelector('chess-board');

    function Pawn(colour) {
        Piece.call(this, identifiers.PAWN, colour);
        this.hasMoved = false;
        this.justMovedDouble = false;
    }

    Pawn.prototype = Object.create(Piece.prototype);
    Pawn.prototype.constructor = Pawn;

    Pawn.prototype.getMoves = function () {
        const result = [];
        
        addStraightMoves.call(this, result);
        addCapturingMoves.call(this, result);
        
        return result;
    }
    
    function addStraightMoves(result) {
        const maxMoveDistance = this.hasMoved ? 1 : 2;
        const direction = this.isWhite ? 1 : -1;

    
        for (let i = 1; i <= maxMoveDistance; i++) {
            const newY = this.coordinates.y + (i * direction);
            if (newY < 0 || newY > 7) {
                break;
            }

            const targetCoordinates = new Coordinates(this.coordinates.x, newY);
            const targetTile = board.getTileAt(targetCoordinates);

            if (targetTile.piece) {
                break;
            }

            result.push(targetCoordinates);
        }
    }
    
    function addCapturingMoves(result) {
        const direction = this.isWhite ? 1 : -1;

        for (let dx of [-1, 1]) {
            const newX = this.coordinates.x + dx;
            const newY = this.coordinates.y + direction;

            if (newY < 0 || newY > 7) {
                break;
            }

            if (newX < 0 || newX > 7) {
                continue;
            }

            const targetCoordinates = new Coordinates(newX, newY);
            const targetTile = board.getTileAt(targetCoordinates);

            if (targetTile.piece && targetTile.piece.colour !== this.colour) {
                result.push(targetCoordinates);
                continue;
            }
            
            // En-passant move
            if (targetTile.piece && targetTile.piece.colour === this.colour) {
                continue;
            }
            
            const enPassantTile = board.getTileAt(new Coordinates(newX, this.coordinates.y));

            if (enPassantTile.piece
                && enPassantTile.piece.colour !== this.colour
                && enPassantTile.piece instanceof Pawn
                && enPassantTile.piece.justMovedDouble) {
                result.push(targetCoordinates);
            };
        }
    }

    Pawn.prototype.onMove = function (moveEvent) {
        if (moveEvent.from) {
            this.hasMoved = true;

            const dy = Math.abs(moveEvent.from.y - moveEvent.to.y);

            this.justMovedDouble = dy === 2;
            
            // Testing for en-passant move
            const dx = Math.abs(moveEvent.from.x - moveEvent.to.x);
            
            if (dx === 1) {
                const enPassantTile = board.getTileAt(
                    new Coordinates(moveEvent.to.x, moveEvent.from.y)
                );
                
                if (enPassantTile.piece
                    && enPassantTile.piece.colour !== this.colour
                    && enPassantTile.piece instanceof Pawn
                    && enPassantTile.piece.justMovedDouble) {
                    enPassantTile.piece = null;
                }
            }
        }
        
        // Promotion
        if (this.isWhite && moveEvent.to.y == 7
            || this.isBlack && moveEvent.to.y == 0) {
            // TODO implement piece selection
            board.getTileAt(moveEvent.to).piece = new Queen(this.colour);
        }
    }

    for (let i = 0; i < 8; i++) {
        board.getTileAt(new Coordinates(i, 1)).piece = new Pawn(colours.WHITE);
        board.getTileAt(new Coordinates(i, 6)).piece = new Pawn(colours.BLACK);
    }
    
    return Pawn;
})(document);