// ****************************
// *                          *
// *       Reference          *
// *                          *
// ****************************

// This file serves as reference only.
// The actual implementation of the application is located in chess-board-application.js

// **********************
// ****** PIECE *********
// **********************

/**
 * Specification of the "Piece" prototype.
 *
 * @param {symbol | IdentiferDefinition | string} identifier - may be one of following:
 * - identifier.PAWN, identifier.ROOK, identifier.KNIGHT, identifier.BISHOP, identifier.QUEEN, identifier.KING
 *   (a corresponding unicode character will be chosen then)
 * - a string (which will be displayed then)
 * - A IdentifierDefinition instance. For example `new IdentifierDefinition('W', 'B')`.
 *   In this case 'W' will be shown if the piece is white, or 'B' will be shown if the piece is black
 *
 * @param {symbol} colour - may be colours.WHITE or colours.BLACK
 */
let Piece = function (identifier, colour) {
  this.identifier = identifier;
  this.colour = colour;
};

/**
 * If you click on your piece, this method is called to determine where your piece can move to.
 * These possible moves are shown in the chessboard with green tiles. Clicking on a green tile
 * will perform the move.
 * 
 * You have to override (shadow) this method in your subtypes for it to work.
 *
 * @returns {Coordinates[]} - An array of coordinates the piece is supposed to be able to move to.
 */
Piece.prototype.getMoves = function () {
  // In the "Piece" type, this method isn't implemented and will throw an error.
};

/**
 * This method is called on every move of a piece. It is not required for it to be able to move. By default, it does nothing.
 * You may implement this to set a state after a piece's move.
 * @param {PieceMoveEvent} moveEvent 
 */
Piece.prototype.onMove = function(moveEvent) {
  // Does nothing
}

/*
 * The "Piece" type comes with some helper fields that are automatically set
 * and not supposed to be written to. You can use those fields to implement "getMoves"
 * in your subtypes.
 */

/** @var {ChessTile} tile - the current tile the piece sits on. */
Piece.prototype.tile;

/** @var {ChessBoard} board - the current chess board the piece sits on. */
Piece.prototype.board;

/** @var {Coordinates} coordinates - the current coordinates the piece sits on */
Piece.prototype.coordinates;

/** @var {boolean} isWhite - true, if the piece is white, otherwise false */
Piece.prototype.isWhite;

/** @var {boolean} isBlack - true, if the piece is black, otherwise false */
Piece.prototype.isBlack;


// **********************
// **** COORDINATES *****
// **********************

/**
 * Specification of the Coordinates type.
 * This is a simple type consisting of an x value and a y value.
 * @param {number} x
 * @param {number} y
 */
let Coordinates = function (x, y) {
  this.x = x;
  this.y = y;
};


// **********************
// **** CHESS BOARD *****
// **********************

/**
 * Specification of the chess board.
 */
let ChessBoard = function () {};

/**
 * This method will return a tile at the given coordinates. Example call:
 * board.getTileAt(new Coordinates(3, 4));
 *
 * @param {Coordinates} coordinates
 * @returns {ChessTile}
 */
ChessBoard.prototype.getTileAt = function (coordinates) {};

/**
 * This method will return a piece at the given coordinates. Example call:
 * board.getPieceAt(new Coordinates(3, 4));
 *
 * @param {Coordinates} coordinates
 * @returns {Piece}
 */
ChessBoard.prototype.getPieceAt = function (coordinates) {};

/**
 * This method returns all pieces currently on the board in an array.
 * @returns {Piece[]}
 */
ChessBoard.prototype.getAllPieces = function () {}

/**
 * This method returns all pieces of a certain colour on the board in an array.
 * @param {symbol} colour 
 * @returns {Piece[]}
 */
ChessBoard.prototype.getAllPiecesOfColour = function(colour) {}


// **********************
// ** CHESS BOARD TILE **
// **********************

/**
 * Specification of a tile.
 */
let ChessTile = function () {
  /**
   * The piece that sits on the tile. You can set this property as you like. Example:
   *
   * tile.piece = myRook;
   *
   * To clear the tile, use following:
   *
   * tile.piece = null;
   *
   * @var {Piece} piece
   */
  this.piece;

  /** @var {Coordinates} coordinates - The coordinates of the tile. */
  this.coordinates;
};

/**
 * Specification of a move event.
 * @param {Coordinates} fromCoordinates 
 * @param {Coordinates} toCoordinates 
 */
let PieceMoveEvent = function (fromCoordinates, toCoordinates) {
  this.fromCoordinates = fromCoordinates;
  this.toCoordinates = toCoordinates;
}