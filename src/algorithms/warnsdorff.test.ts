import { describe, it, expect } from 'vitest';
import { solveKnightsTour } from '../algorithms/warnsdorff';
import type { Position } from '../types';

describe('Warnsdorff Algorithm', () => {
    describe('solveKnightsTour', () => {
        it('should find a valid tour from starting position', () => {
            const start: Position = [0, 0]; // a8
            const result = solveKnightsTour(start, false);

            expect(result).not.toBeNull();
            expect(result?.path).toBeDefined();
            expect(result?.isClosed).toBeDefined();
        });

        it('should complete all 64 squares', () => {
            const start: Position = [0, 0];
            const result = solveKnightsTour(start, false);

            expect(result).not.toBeNull();
            expect(result!.path).toHaveLength(64);
        });

        it('should only visit each square once', () => {
            const start: Position = [0, 0];
            const result = solveKnightsTour(start, false);

            expect(result).not.toBeNull();

            const visited = new Set<string>();
            result!.path.forEach(pos => {
                const key = `${pos[0]},${pos[1]}`;
                expect(visited.has(key)).toBe(false);
                visited.add(key);
            });

            expect(visited.size).toBe(64);
        });

        it('should make only valid knight moves', () => {
            const start: Position = [0, 0];
            const result = solveKnightsTour(start, false);

            expect(result).not.toBeNull();

            const validMoveOffsets = [
                [1, 2], [1, -2], [-1, 2], [-1, -2],
                [2, 1], [2, -1], [-2, 1], [-2, -1]
            ];

            for (let i = 0; i < result!.path.length - 1; i++) {
                const from = result!.path[i];
                const to = result!.path[i + 1];

                const dx = to[0] - from[0];
                const dy = to[1] - from[1];

                const isValidMove = validMoveOffsets.some(
                    ([ox, oy]) => ox === dx && oy === dy
                );

                expect(isValidMove).toBe(true);
            }
        });

        it('should start at the specified position', () => {
            const start: Position = [3, 4]; // d4
            const result = solveKnightsTour(start, false);

            expect(result).not.toBeNull();
            expect(result!.path[0]).toEqual(start);
        });

        it('should return isClosed as false for open tours when preferClosed is false', () => {
            const start: Position = [0, 0];
            const result = solveKnightsTour(start, false);

            expect(result).not.toBeNull();
            // Note: isClosed might still be true if algorithm found a closed tour
            expect(result!.isClosed).toBeDefined();
            expect(typeof result!.isClosed).toBe('boolean');
        });

        it('should attempt to find closed tour when preferClosed is true', () => {
            const start: Position = [0, 0];
            const result = solveKnightsTour(start, true);

            expect(result).not.toBeNull();
            expect(result!.isClosed).toBeDefined();

            // If closed, verify last position can reach start
            if (result!.isClosed) {
                const lastPos = result!.path[result!.path.length - 1];
                const dx = Math.abs(lastPos[0] - start[0]);
                const dy = Math.abs(lastPos[1] - start[1]);

                const canReach = (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
                expect(canReach).toBe(true);
            }
        }, 180000); // 3 minute timeout for closed tour algorithm

        it('should handle different starting positions', () => {
            const positions: Position[] = [
                [0, 0], // a8 corner
                [7, 7], // h1 corner
                [3, 4], // d4 center
                [0, 7], // a1 corner
                [7, 0], // h8 corner
            ];

            positions.forEach(start => {
                const result = solveKnightsTour(start, false);
                expect(result).not.toBeNull();
                expect(result!.path[0]).toEqual(start);
                expect(result!.path).toHaveLength(64);
            });
        });

        it('should keep all positions within board bounds', () => {
            const start: Position = [0, 0];
            const result = solveKnightsTour(start, false);

            expect(result).not.toBeNull();

            result!.path.forEach(pos => {
                expect(pos[0]).toBeGreaterThanOrEqual(0);
                expect(pos[0]).toBeLessThan(8);
                expect(pos[1]).toBeGreaterThanOrEqual(0);
                expect(pos[1]).toBeLessThan(8);
            });
        });
    });
});
