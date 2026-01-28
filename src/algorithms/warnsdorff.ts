import { Position } from '../types';
import { getValidMoves } from '../utils/validation';

export const getBestMove = (current: Position, board: number[][]): Position | null => {
    const moves = getValidMoves(current, board);

    if (moves.length === 0) return null;

    // Sort moves by degree (number of onward moves)
    // Warnsdorff's rule: Choose the square with the fewest onward moves
    const movesWithDegree = moves.map(move => {
        // Temporarily mark the move to check its onward moves
        board[move[0]][move[1]] = 999;
        const degree = getValidMoves(move, board).length;
        board[move[0]][move[1]] = -1; // Reset
        return { move, degree };
    });

    // Sort: Ascending degree. 
    // Tie-breaking is implicit (first found), but could be improved.
    movesWithDegree.sort((a, b) => a.degree - b.degree);

    return movesWithDegree[0].move;
};
