const Queen = ((document) => {
    const board = document.querySelector('chess-board');

    function Queen(colour) {
        Piece.call(this, identifiers.QUEEN, colour);
    };

    Queen.prototype = Object.create(Piece.prototype);
    Queen.prototype.constructor = Queen;

    Queen.prototype.canMoveStraight = true;
    Queen.prototype.canMoveDiagonally = true;
    Queen.prototype.maxMoveDistance = 8;

    const straightDirections = {
        north: { dx: 0, dy: 1 },
        east: { dx: 1, dy: 0 },
        south: { dx: 0, dy: -1 },
        west: { dx: -1, dy: 0 }
    };

    const diagonalDirections = {
        northeast: { dx: 1, dy: 1 },
        southeast: { dx: 1, dy: -1 },
        southwest: { dx: -1, dy: -1 },
        northwest: { dx: -1, dy: 1 },
    };

    Queen.prototype.getMoves = function () {
        const result = [];

        if (this.canMoveStraight) {
            addMoves.call(this, result, {...straightDirections});
        }

        if (this.canMoveDiagonally) {
            addMoves.call(this, result, {...diagonalDirections});
        }

        return result;
    }

    function addMoves(result, directions) {
        for (let distance = 1; distance <= this.maxMoveDistance; distance++) {
            for (let directionKey in directions) {
                const direction = directions[directionKey];

                const newX = this.coordinates.x + direction.dx * distance;
                const newY = this.coordinates.y + direction.dy * distance;
                let targetCoordinates;

                try {
                    targetCoordinates = new Coordinates(newX, newY);
                } catch (e) {
                    delete directions[directionKey];
                    continue;
                }

                const targetTile = board.getTileAt(targetCoordinates);

                if (targetTile.piece) {
                    if (targetTile.piece.colour !== this.colour) {
                        result.push(targetCoordinates);
                    }

                    delete directions[directionKey];
                    continue;
                } else {
                    result.push(targetCoordinates);
                }
            }
        }
    }

    board.getTileAt(new Coordinates(3, 0)).piece = new Queen(colours.WHITE);
    board.getTileAt(new Coordinates(3, 7)).piece = new Queen(colours.BLACK);

    return Queen;
})(document);