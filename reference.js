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
 * @param {symbol} symbol - may be one of following:
 * - symbols.PAWN, symbols.ROOK, symbols.KNIGHT, symbols.BISHOP, symbols.QUEEN, symbols.KING
 *   (a corresponding unicode symbol will be chosen then)
 * - a string (which will be displayed then)
 * - an object with the keys [colours.WHITE] and [colours.BLACK], and string values.
 *   Example: { [colours.WHITE]: "A", [colours.BLACK]: "B" }
 *   In this case, A will be displayed if the piece is white, or B will be displayed if the piece is black
 *
 * @param {symbol} colour - may be colours.WHITE or colours.BLACK
 */
let Piece = function (symbol, colour) {
  this.symbol = symbol;
  this.colour = colour;

  /*
   * The "Piece" type comes with some helper fields that are automatically set
   * and not supposed to be written to. You can use those fields to implement "getMoves"
   * in your subtypes.
   */

  /** @var {HTMLChessTileElement} _tile - the current tile the piece sits on. */
  this._tile;

  /** @var {HTMLChessBoardElement} _board - the current chess board the piece sits on. */
  this._board;

  /** @var {Coordinates} _coordinates - the current coordinates the piece sits on */
  this._coordinates;

  /** @var {boolean} _isWhite - true, if the piece is white, otherwise false */
  this._isWhite;

  /** @var {boolean} _isBlack - true, if the piece is black, otherwise false */
  this._isBlack;
};

/**
 * If you click on your piece, this method is called to determine where your piece can move to.
 * You have to override (shadow) this method in your subtypes for it to work.
 *
 * @returns {Coordinates[]} - An array of coordinates the piece is supposed to be able to move to.
 */
Piece.prototype.getMoves = function () {
  // In the "Piece" type, this method isn't implemented and will throw an error.
};


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
let HTMLChessBoardElement = function () {};

/**
 * This method will return a tile at the given coordinates. Example call:
 * board.getTileAt(new Coordinates(3, 4));
 *
 * @param {Coordinates} coordinates
 * @returns {HTMLChessTileElement}
 */
HTMLChessBoardElement.prototype.getTileAt = function (coordinates) {};

/**
 * This method will return a piece at the given coordinates. Example call:
 * board.getPieceAt(new Coordinates(3, 4));
 *
 * @param {Coordinates} coordinates
 * @returns {Piece}
 */
HTMLChessBoardElement.prototype.getPieceAt = function (coordinates) {};

/**
 * This method returns all pieces currently on the board in an array.
 * @returns {Piece[]}
 */
HTMLChessBoardElement.prototype.getAllPieces = function () {}

/**
 * This method returns all pieces of a certain colour on the board in an array.
 * @param {symbol} colour 
 * @returns {Piece[]}
 */
HTMLChessBoardElement.prototype.getAllPiecesOfColour = function(colour) {}


// **********************
// ** CHESS BOARD TILE **
// **********************

/**
 * Specification of a tile.
 */
let HTMLChessTileElement = function () {
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