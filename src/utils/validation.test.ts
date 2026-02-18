import { describe, it, expect } from 'vitest';
import { getValidMoves, isTourComplete, KNIGHT_MOVES } from '../utils/validation';
import type { Position } from '../types';

describe('validation utilities', () => {
    describe('KNIGHT_MOVES', () => {
        it('should have exactly 8 possible knight moves', () => {
            expect(KNIGHT_MOVES).toHaveLength(8);
        });

        it('should contain all valid knight move patterns', () => {
            const expected = [
                [1, 2], [1, -2], [-1, 2], [-1, -2],
                [2, 1], [2, -1], [-2, 1], [-2, -1]
            ];
            expect(KNIGHT_MOVES).toEqual(expected);
        });
    });

    describe('getValidMoves', () => {
        it('should return 2 moves from corner position a1 [0,7]', () => {
            const board = Array(8).fill(null).map(() => Array(8).fill(-1));
            const pos: Position = [0, 7]; // a1 corner
            const moves = getValidMoves(pos, board);

            expect(moves).toHaveLength(2);
            // Should be able to move to b3 or c2
            expect(moves).toContainEqual([1, 5]); // b3
            expect(moves).toContainEqual([2, 6]); // c2
        });

        it('should return 2 moves from corner position h8 [7,0]', () => {
            const board = Array(8).fill(null).map(() => Array(8).fill(-1));
            const pos: Position = [7, 0]; // h8 corner
            const moves = getValidMoves(pos, board);

            expect(moves).toHaveLength(2);
        });

        it('should return 8 moves from center position d4 [3,4]', () => {
            const board = Array(8).fill(null).map(() => Array(8).fill(-1));
            const pos: Position = [3, 4]; // d4 center
            const moves = getValidMoves(pos, board);

            expect(moves).toHaveLength(8);
        });

        it('should exclude visited squares', () => {
            const board = Array(8).fill(null).map(() => Array(8).fill(-1));
            const pos: Position = [3, 4]; // d4

            // Mark some squares as visited
            board[4][6] = 1; // One of the valid moves
            board[2][6] = 2; // Another valid move

            const moves = getValidMoves(pos, board);

            expect(moves).toHaveLength(6); // Should have 6 instead of 8
            expect(moves).not.toContainEqual([4, 6]);
            expect(moves).not.toContainEqual([2, 6]);
        });

        it('should not return out-of-bounds positions', () => {
            const board = Array(8).fill(null).map(() => Array(8).fill(-1));
            const pos: Position = [0, 0]; // a8 corner
            const moves = getValidMoves(pos, board);

            // All moves should be within bounds
            moves.forEach(move => {
                expect(move[0]).toBeGreaterThanOrEqual(0);
                expect(move[0]).toBeLessThan(8);
                expect(move[1]).toBeGreaterThanOrEqual(0);
                expect(move[1]).toBeLessThan(8);
            });
        });

        it('should return empty array when all possible moves are visited', () => {
            const board = Array(8).fill(null).map(() => Array(8).fill(-1));
            const pos: Position = [3, 4]; // d4

            // Mark all possible moves as visited
            board[4][6] = 1;
            board[5][5] = 2;
            board[5][3] = 3;
            board[4][2] = 4;
            board[2][2] = 5;
            board[1][3] = 6;
            board[1][5] = 7;
            board[2][6] = 8;

            const moves = getValidMoves(pos, board);
            expect(moves).toHaveLength(0);
        });
    });

    describe('isTourComplete', () => {
        it('should return true when all squares are visited', () => {
            const board = Array(8).fill(null).map(() =>
                Array(8).fill(0).map((_, i) => i + 1)
            );

            expect(isTourComplete(board)).toBe(true);
        });

        it('should return false when any square is unvisited', () => {
            const board = Array(8).fill(null).map(() => Array(8).fill(1));
            board[0][0] = -1; // One unvisited square

            expect(isTourComplete(board)).toBe(false);
        });

        it('should return false for empty board', () => {
            const board = Array(8).fill(null).map(() => Array(8).fill(-1));

            expect(isTourComplete(board)).toBe(false);
        });

        it('should return false when multiple squares are unvisited', () => {
            const board = Array(8).fill(null).map(() => Array(8).fill(1));
            board[0][0] = -1;
            board[7][7] = -1;
            board[3][4] = -1;

            expect(isTourComplete(board)).toBe(false);
        });
    });
});
