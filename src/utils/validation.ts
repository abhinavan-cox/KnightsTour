import { Position } from '../types';
import { isValidPos } from './chess';

export const KNIGHT_MOVES = [
    [1, 2], [1, -2], [-1, 2], [-1, -2],
    [2, 1], [2, -1], [-2, 1], [-2, -1]
];

export const getValidMoves = (current: Position, board: number[][]): Position[] => {
    const [x, y] = current;
    const moves: Position[] = [];

    for (const [dx, dy] of KNIGHT_MOVES) {
        const newX = x + dx;
        const newY = y + dy;
        const newPos: Position = [newX, newY];

        if (isValidPos(newPos) && board[newX][newY] === -1) {
            moves.push(newPos);
        }
    }

    return moves;
};

export const isTourComplete = (board: number[][]): boolean => {
    return board.every(col => col.every(cell => cell !== -1));
};
