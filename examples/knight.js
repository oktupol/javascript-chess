const Knight = ((document) => {
    const board = document.querySelector('chess-board');

    function Knight(colour) {
        Piece.call(this, identifiers.KNIGHT, colour);
    }

    Knight.prototype = Object.create(Piece.prototype);
    Knight.prototype.constructor = Knight;

    const possibleMoves = [
        { dx: 1, dy: 2 },
        { dx: 1, dy: -2 },
        { dx: -1, dy: 2 },
        { dx: -1, dy: -2 },
        { dx: 2, dy: 1 },
        { dx: 2, dy: -1 },
        { dx: -2, dy: 1 },
        { dx: -2, dy: -1 },
    ];

    Knight.prototype.getMoves = function () {
        return possibleMoves
            .map(({ dx, dy }) => {
                try {
                    return new Coordinates(this.coordinates.x + dx, this.coordinates.y + dy);
                } catch (e) {
                    return null;
                }
            })
            .filter(c => c)
            .filter(c => {
                const targetTile = board.getTileAt(c);
                
                return !targetTile.piece || targetTile.piece.colour !== this.colour;
            });
    }

    for (let x of [1, 6]) {
        board.getTileAt(new Coordinates(x, 0)).piece = new Knight(colours.WHITE);
        board.getTileAt(new Coordinates(x, 7)).piece = new Knight(colours.BLACK);
    }

    return Knight;
})(document);