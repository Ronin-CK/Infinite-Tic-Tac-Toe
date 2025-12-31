# Infinite Tic-Tac-Toe

An extended version of Tic-Tac-Toe played on an infinite grid instead of a fixed 3×3 board.

## Key Features
- Infinite, dynamically expanding game board
- Localized win detection based on the last move
- Two-player turn-based gameplay
- No fixed board limits

## Tech Stack
- HTML
- CSS
- Vanilla JavaScript

## How It Works
The board expands dynamically as players make moves.  
Win detection checks only around the most recent move instead of scanning the entire grid, keeping the logic efficient.

## How to Run
Open `index.html` in any modern browser.

## Future Improvements
- AI opponent
- Undo / redo moves
- Adjustable win-length (e.g., 5 in a row)
