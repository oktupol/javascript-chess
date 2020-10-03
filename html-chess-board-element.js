class HTMLChessBoardElement extends HTMLElement {
    constructor() {
        super();
    
        this.attachShadow({mode: "open"});
        
        let styles = document.createElement('style');
        this.shadowRoot.appendChild(styles);
        styles.textContent = `
            #board {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-end;
                height: 510px;
                width: 540px;
            }
        
            #y-descriptor, #x-descriptor {
                display: flex;
                justify-content: space-around;
                font-family: monospace;
                color: #555;
            }
        
            #y-descriptor {
                height: 480;
                width: 40px;
                flex-direction: column-reverse;
                align-items: flex-end;
                padding-right: .5em;
            }
        
            #x-descriptor {
                height: 30px;
                width: 480px;
                padding-top: .3em;
            }

            #y-descriptor div, #x-descriptor div {
                display: inline-block;
            }
        
            #tile-container {
                display: flex;
                flex-wrap: wrap;
                width: 480px;
                height: 480px;
            }
        
            #tile-container div {
                height: 12.5%;
                width: 12.5%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 3em;
            }
        
            #tile-container div.has-piece {
                cursor: pointer;
            }

            #tile-container div.light-tile {
                background: #ddd;
            }
        
            #tile-container div.dark-tile {
                background-color: #aaa;
            }
        `;
        
        let board = document.createElement('div');
        board.id = 'board';

        let tileContainer = document.createElement('div');
        tileContainer.id = 'tile-container';
        
        let xDescriptor = document.createElement('div');
        xDescriptor.id = 'x-descriptor';

        let yDescriptor = document.createElement('div');
        yDescriptor.id = 'y-descriptor';

        this.shadowRoot.appendChild(board);
        board.appendChild(yDescriptor);
        board.appendChild(tileContainer);
        board.appendChild(xDescriptor);
        
        this._tiles = [];
        
        for (let y = 7; y >= 0; y--) {
            this._tiles[y] = [];
            for (let x = 0; x < 8; x++) {
                /** @var {HTMLChessTileElement} tile */
                let tile = document.createElement('div', { is: 'chess-tile' });
                tile.coordinates = new Coordinates(x, y);
                tile.board = this;
                tileContainer.appendChild(tile);
                this._tiles[y][x] = tile;
            }
        }
        
        for (let i = 0; i < 8; i++) {
            let xLabel = document.createElement('div');
            let yLabel = document.createElement('div');
            
            xLabel.innerText = `x: ${i}`;
            yLabel.innerText = `y: ${i}`;
            
            xDescriptor.appendChild(xLabel);
            yDescriptor.appendChild(yLabel);
        }
    }
    
    /**
     * @param {Coordinates} coordinates 
     * @returns {HTMLChessTileElement}
     */
    getTileAt(coordinates) {
        return this._tiles[coordinates.y][coordinates.x];
    }
    
    /**
     * @param {Coordinates} coordinates 
     * @returns {Piece}
     */
    getPieceAt(coordinates) {
        return this.getTileAt(coordinates).piece;
    }
}
window.customElements.define('chess-board', HTMLChessBoardElement);

class HTMLChessTileElement extends HTMLDivElement {
    /**
     * @param {Coordinates} coordinates 
     */
    constructor() {
        super();
        this.board = null;
        this._coordinates = null;
        this._piece = null;
        
        this._symbolHolder = document.createElement('span');
        this.appendChild(this._symbolHolder);
    }
    
    /**
     * @returns {Coordinates}
     */
    get coordinates() {
        return this._coordinates;
    }
    
    /**
     * @param {Coordinates} coordinates
     */
    set coordinates(coordinates) {
        this._coordinates = coordinates;
        
        if ((coordinates.x + coordinates.y) % 2 == 0) {
            this.classList.add('dark-tile');
        } else {
            this.classList.add('light-tile');
        }
    }
    
    /**
     * @returns {Piece}
     */
    get piece() {
        return this._piece;
    }
    
    /**
     * @param {Piece} piece
     */
    set piece(piece) {
        if (this._piece instanceof Piece) {
            this._piece._tile = null;
        }
        
        this._piece = piece;
        
        if (piece instanceof Piece) {
            this._symbolHolder.textContent = piece.unicodeSymbol;
            
            if (piece._tile instanceof HTMLChessTileElement) {
                piece._tile.piece = null;
            }
            
            piece._tile = this;
            
            this.classList.add('has-piece');
        } else {
            this._symbolHolder.textContent = '';
            
            this.classList.remove('has-piece');
        }
    }
}
window.customElements.define('chess-tile', HTMLChessTileElement, { extends: 'div' });

const colours = {
    WHITE: Symbol('white'),
    BLACK: Symbol('black'),
};

const symbols = {
    ROOK: Symbol('rook'),
    KNIGHT: Symbol('knight'),
    BISHOP: Symbol('bishop'),
    QUEEN: Symbol('queen'),
    KING: Symbol('king'),
    PAWN: Symbol('pawn'),
}

const symbolsUnicode = {
    [symbols.ROOK]: {
        [colours.WHITE]: '♖',
        [colours.BLACK]: '♜',
    },
    [symbols.KNIGHT]: {
        [colours.WHITE]: '♘',
        [colours.BLACK]: '♞',
    },
    [symbols.BISHOP]: {
        [colours.WHITE]: '♗',
        [colours.BLACK]: '♝',
    },
    [symbols.QUEEN]: {
        [colours.WHITE]: '♕',
        [colours.BLACK]: '♛',
    },
    [symbols.KING]: {
        [colours.WHITE]: '♔',
        [colours.BLACK]: '♚',
    },
    [symbols.PAWN]: {
        [colours.WHITE]: '♙',
        [colours.BLACK]: '♟︎',
    }
}

class Coordinates {
    /**
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this.x = this._validateCoordinate('x', x);
        this.y = this._validateCoordinate('y', y);
    }
    
    /**
     * @param {string} name 
     * @param {number} value 
     * @returns {number}
     */
    _validateCoordinate(name, value) {
        if (value < 0 || value > 7) {
            throw new TypeError(`Coordinate ${name} must be between 0 and 7. Got ${value}.`);
        }
        return value;
    }
}

/**
 * @param {symbol} symbol 
 * @param {symbol} colour 
 */
let Piece = function(symbol, colour) {
    this.symbol = symbol;
    this.colour = colour;

    Reflect.defineProperty(this, '_tile', {
        enumerable: false,
        writable: true,
        value: null
    });
    
    Reflect.defineProperty(this, '_board', {
        enumerable: false,
        get: () => {
            if (this._tile instanceof HTMLChessTileElement) {
                return this._tile.board;
            }
            return null;
        }
    });
    
    Reflect.defineProperty(this, '_coordinates', {
        enumerable: false,
        get: () => {
            if (this._tile instanceof HTMLChessTileElement) {
                return this._tile.coordinates;
            }
            return null
        }
    });
    
    Reflect.defineProperty(this, '_isWhite', {
        enumerable: false,
        get: () => {
            return this.colour === colours.WHITE
        }
    });

    Reflect.defineProperty(this, '_isBlack', {
        enumerable: false,
        get: () => {
            return this.colour === colours.BLACK
        }
    });
    
    Reflect.defineProperty(this, 'unicodeSymbol', {
        enumerable: false,
        get: () => {
            return symbolsUnicode[this.symbol][this.colour];
        }
    });
};

/**
 * @returns {Coordinates[]}
 */
Piece.prototype.getMoves = function() {
    throw new TypeError('The abstract "Piece" type doesn\'t support getMoves. You need to create your own type that inherits from "Piece".');
}