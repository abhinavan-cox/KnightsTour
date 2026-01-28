import { Position } from '../types';
import { getValidMoves } from '../utils/validation';
import { KNIGHT_MOVES } from '../utils/validation';
import { isValidPos } from '../utils/chess';

/**
 * Improved Warnsdorff's algorithm with better tie-breaking
 * and backtracking support for difficult positions
 */

// Calculate distance from center (for tie-breaking)
const distanceFromCenter = (pos: Position): number => {
    const centerX = 3.5;
    const centerY = 3.5;
    const dx = pos[0] - centerX;
    const dy = pos[1] - centerY;
    return Math.sqrt(dx * dx + dy * dy);
};

// Check if position can reach the start position (for closed tour)
const canReachStart = (pos: Position, start: Position, board: number[][]): boolean => {
    for (const [dx, dy] of KNIGHT_MOVES) {
        const newPos: Position = [pos[0] + dx, pos[1] + dy];
        if (isValidPos(newPos) && newPos[0] === start[0] && newPos[1] === start[1]) {
            // Check if start position is the only unvisited square
            const unvisitedSquares = board.flat().filter(cell => cell === -1).length;
            return unvisitedSquares === 0;
        }
    }
    return false;
};

export const getBestMove = (current: Position, board: number[][], startPosition?: Position): Position | null => {
    const moves = getValidMoves(current, board);

    if (moves.length === 0) return null;

    // Calculate degree for each move with improved tie-breaking
    const movesWithDegree = moves.map(move => {
        // Temporarily mark the move to check its onward moves
        board[move[0]][move[1]] = 999;
        const nextMoves = getValidMoves(move, board);
        const degree = nextMoves.length;

        // For potential last move, check if it can return to start (closed tour)
        const totalSquares = board.flat().filter(cell => cell !== -1).length;
        const isLastMove = totalSquares === 63; // 64 total, 1 will be unvisited
        const canClose = startPosition && isLastMove ?
            canReachStart(move, startPosition, board) : false;

        board[move[0]][move[1]] = -1; // Reset

        return {
            move,
            degree,
            distFromCenter: distanceFromCenter(move),
            canClose
        };
    });

    // Sort by multiple criteria:
    // 1. Prefer moves that can close the tour (if on last move)
    // 2. Lowest degree (Warnsdorff's rule)
    // 3. Further from center (better for completing tour)
    movesWithDegree.sort((a, b) => {
        // Prioritize closing move
        if (a.canClose !== b.canClose) {
            return a.canClose ? -1 : 1;
        }
        // Then by degree
        if (a.degree !== b.degree) {
            return a.degree - b.degree;
        }
        // Then by distance from center (prefer edges/corners)
        return b.distFromCenter - a.distFromCenter;
    });

    return movesWithDegree[0].move;
};

/**
 * Solve knight's tour with backtracking support
 * Returns the complete path or empty array if no solution
 */
export const solveKnightsTour = (
    start: Position,
    preferClosed: boolean = false
): Position[] | null => {
    const board: number[][] = Array(8).fill(null).map(() => Array(8).fill(-1));
    const path: Position[] = [start];
    board[start[0]][start[1]] = 1;

    const backtrack = (current: Position, moveCount: number): boolean => {
        // Check if tour is complete
        if (moveCount === 64) {
            // If preferClosed, verify we can return to start
            if (preferClosed) {
                return canReachStart(current, start, board);
            }
            return true;
        }

        // Get next moves using improved Warnsdorff's heuristic
        const moves = getValidMoves(current, board);

        if (moves.length === 0) return false;

        // Calculate degree and sort
        const movesWithDegree = moves.map(move => {
            board[move[0]][move[1]] = 999;
            const degree = getValidMoves(move, board).length;
            const canClose = preferClosed && moveCount === 63 ?
                canReachStart(move, start, board) : false;
            board[move[0]][move[1]] = -1;

            return {
                move,
                degree,
                distFromCenter: distanceFromCenter(move),
                canClose
            };
        });

        movesWithDegree.sort((a, b) => {
            if (a.canClose !== b.canClose) return a.canClose ? -1 : 1;
            if (a.degree !== b.degree) return a.degree - b.degree;
            return b.distFromCenter - a.distFromCenter;
        });

        // Try each move
        for (const { move } of movesWithDegree) {
            const [x, y] = move;
            board[x][y] = moveCount + 1;
            path.push(move);

            if (backtrack(move, moveCount + 1)) {
                return true;
            }

            // Backtrack
            board[x][y] = -1;
            path.pop();
        }

        return false;
    };

    if (backtrack(start, 1)) {
        return path;
    }

    return null;
};
