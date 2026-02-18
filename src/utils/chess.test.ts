import { describe, it, expect } from 'vitest';
import { isValidPos, toAlgebraic, COL_LABELS, ROW_LABELS } from '../utils/chess';
import type { Position } from '../types';

describe('chess utilities', () => {
    describe('isValidPos', () => {
        it('should return true for valid positions', () => {
            expect(isValidPos([0, 0])).toBe(true);
            expect(isValidPos([7, 7])).toBe(true);
            expect(isValidPos([3, 4])).toBe(true);
            expect(isValidPos([0, 7])).toBe(true);
        });

        it('should return false for negative coordinates', () => {
            expect(isValidPos([-1, 0])).toBe(false);
            expect(isValidPos([0, -1])).toBe(false);
            expect(isValidPos([-1, -1])).toBe(false);
        });

        it('should return false for coordinates >= 8', () => {
            expect(isValidPos([8, 0])).toBe(false);
            expect(isValidPos([0, 8])).toBe(false);
            expect(isValidPos([8, 8])).toBe(false);
            expect(isValidPos([10, 5])).toBe(false);
        });

        it('should return false for out of bounds combinations', () => {
            expect(isValidPos([-1, 8])).toBe(false);
            expect(isValidPos([8, -1])).toBe(false);
        });
    });

    describe('toAlgebraic', () => {
        it('should convert position [0,0] to a8', () => {
            const pos: Position = [0, 0];
            expect(toAlgebraic(pos)).toBe('a8');
        });

        it('should convert position [7,7] to h1', () => {
            const pos: Position = [7, 7];
            expect(toAlgebraic(pos)).toBe('h1');
        });

        it('should convert position [3,4] to d4', () => {
            const pos: Position = [3, 4];
            expect(toAlgebraic(pos)).toBe('d4');
        });

        it('should convert position [0,7] to a1', () => {
            const pos: Position = [0, 7];
            expect(toAlgebraic(pos)).toBe('a1');
        });

        it('should convert position [7,0] to h8', () => {
            const pos: Position = [7, 0];
            expect(toAlgebraic(pos)).toBe('h8');
        });
    });

    describe('COL_LABELS', () => {
        it('should have 8 column labels from a to h', () => {
            expect(COL_LABELS).toHaveLength(8);
            expect(COL_LABELS).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
        });
    });

    describe('ROW_LABELS', () => {
        it('should have 8 row labels from 8 to 1', () => {
            expect(ROW_LABELS).toHaveLength(8);
            expect(ROW_LABELS).toEqual(['8', '7', '6', '5', '4', '3', '2', '1']);
        });
    });
});
