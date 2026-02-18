import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from '../store/gameStore';
import type { Position } from '../types';

describe('Game Store', () => {
    beforeEach(() => {
        // Reset store before each test
        const { resetGame } = useGameStore.getState();
        resetGame();
    });

    describe('initial state', () => {
        it('should have correct initial values', () => {
            const state = useGameStore.getState();

            expect(state.mode).toBe('manual');
            expect(state.status).toBe('setup');
            expect(state.knightPosition).toBeNull();
            expect(state.moveHistory).toHaveLength(0);
            expect(state.autoPath).toBeNull();
            expect(state.isClosedTour).toBe(false);
            expect(state.stats.startTime).toBe(0);
            expect(state.stats.endTime).toBeNull();
        });

        it('should have empty board with all -1 values', () => {
            const state = useGameStore.getState();

            state.board.forEach(col => {
                col.forEach(cell => {
                    expect(cell).toBe(-1);
                });
            });
        });
    });

    describe('setStartParams', () => {
        it('should initialize board with move 1 at starting position', () => {
            const { setStartParams } = useGameStore.getState();
            const start: Position = [3, 4];

            setStartParams(start);

            const state = useGameStore.getState();
            expect(state.board[3][4]).toBe(1);
        });

        it('should set knight position', () => {
            const { setStartParams } = useGameStore.getState();
            const start: Position = [0, 0];

            setStartParams(start);

            const state = useGameStore.getState();
            expect(state.knightPosition).toEqual(start);
        });

        it('should set status to playing', () => {
            const { setStartParams } = useGameStore.getState();
            const start: Position = [0, 0];

            setStartParams(start);

            const state = useGameStore.getState();
            expect(state.status).toBe('playing');
        });

        it('should record start time', () => {
            const { setStartParams } = useGameStore.getState();
            const start: Position = [0, 0];
            const beforeTime = Date.now();

            setStartParams(start);

            const state = useGameStore.getState();
            expect(state.stats.startTime).toBeGreaterThanOrEqual(beforeTime);
            expect(state.stats.startTime).toBeLessThanOrEqual(Date.now());
        });

        it('should add first move to history', () => {
            const { setStartParams } = useGameStore.getState();
            const start: Position = [0, 0];

            setStartParams(start);

            const state = useGameStore.getState();
            expect(state.moveHistory).toHaveLength(1);
            expect(state.moveHistory[0].moveNumber).toBe(1);
            expect(state.moveHistory[0].to).toEqual(start);
            expect(state.moveHistory[0].from).toBeNull();
        });
    });

    describe('makeMove', () => {
        beforeEach(() => {
            const { setStartParams } = useGameStore.getState();
            setStartParams([0, 0]);
        });

        it('should update board with new move number', () => {
            const { makeMove } = useGameStore.getState();
            const newPos: Position = [1, 2];

            makeMove(newPos);

            const state = useGameStore.getState();
            expect(state.board[1][2]).toBe(2); // Second move
        });

        it('should update knight position', () => {
            const { makeMove } = useGameStore.getState();
            const newPos: Position = [1, 2];

            makeMove(newPos);

            const state = useGameStore.getState();
            expect(state.knightPosition).toEqual(newPos);
        });

        it('should add to move history', () => {
            const { makeMove } = useGameStore.getState();
            const newPos: Position = [1, 2];

            makeMove(newPos);

            const state = useGameStore.getState();
            expect(state.moveHistory).toHaveLength(2);
            expect(state.moveHistory[1].moveNumber).toBe(2);
            expect(state.moveHistory[1].to).toEqual(newPos);
        });

        it('should set status to solved when 64 moves made', () => {
            const { setStartParams, makeMove } = useGameStore.getState();

            // Simulate 63 more moves
            for (let i = 0; i < 63; i++) {
                const mockPos: Position = [i % 8, Math.floor(i / 8)];
                makeMove(mockPos);
            }

            const state = useGameStore.getState();
            expect(state.status).toBe('solved');
        });

        it('should record end time when solved', () => {
            const { makeMove } = useGameStore.getState();

            // Simulate 63 more moves to complete the tour
            for (let i = 0; i < 63; i++) {
                const mockPos: Position = [i % 8, Math.floor(i / 8)];
                makeMove(mockPos);
            }

            const state = useGameStore.getState();
            expect(state.stats.endTime).not.toBeNull();
            expect(state.stats.endTime).toBeGreaterThanOrEqual(state.stats.startTime);
        });
    });

    describe('resetGame', () => {
        beforeEach(() => {
            const { setStartParams, makeMove } = useGameStore.getState();
            setStartParams([0, 0]);
            makeMove([1, 2]);
            makeMove([2, 4]);
        });

        it('should clear board', () => {
            const { resetGame } = useGameStore.getState();

            resetGame();

            const state = useGameStore.getState();
            state.board.forEach(col => {
                col.forEach(cell => {
                    expect(cell).toBe(-1);
                });
            });
        });

        it('should reset knight position', () => {
            const { resetGame } = useGameStore.getState();

            resetGame();

            const state = useGameStore.getState();
            expect(state.knightPosition).toBeNull();
        });

        it('should clear move history', () => {
            const { resetGame } = useGameStore.getState();

            resetGame();

            const state = useGameStore.getState();
            expect(state.moveHistory).toHaveLength(0);
        });

        it('should reset status to setup', () => {
            const { resetGame } = useGameStore.getState();

            resetGame();

            const state = useGameStore.getState();
            expect(state.status).toBe('setup');
        });

        it('should reset isClosedTour flag', () => {
            const { setIsClosedTour, resetGame } = useGameStore.getState();

            setIsClosedTour(true);
            resetGame();

            const state = useGameStore.getState();
            expect(state.isClosedTour).toBe(false);
        });

        it('should reset stats', () => {
            const { resetGame } = useGameStore.getState();

            resetGame();

            const state = useGameStore.getState();
            expect(state.stats.startTime).toBe(0);
            expect(state.stats.endTime).toBeNull();
            expect(state.stats.backtracks).toBe(0);
            expect(state.stats.algorithmSteps).toBe(0);
        });
    });

    describe('isClosedTour tracking', () => {
        it('should be false initially', () => {
            const state = useGameStore.getState();
            expect(state.isClosedTour).toBe(false);
        });

        it('should update when setIsClosedTour is called', () => {
            const { setIsClosedTour } = useGameStore.getState();

            setIsClosedTour(true);

            const state = useGameStore.getState();
            expect(state.isClosedTour).toBe(true);
        });

        it('should toggle correctly', () => {
            const { setIsClosedTour } = useGameStore.getState();

            setIsClosedTour(true);
            expect(useGameStore.getState().isClosedTour).toBe(true);

            setIsClosedTour(false);
            expect(useGameStore.getState().isClosedTour).toBe(false);
        });
    });

    describe('setMode', () => {
        it('should switch from manual to auto', () => {
            const { setMode } = useGameStore.getState();

            setMode('auto');

            const state = useGameStore.getState();
            expect(state.mode).toBe('auto');
        });

        it('should switch from auto to manual', () => {
            const { setMode } = useGameStore.getState();

            setMode('auto');
            setMode('manual');

            const state = useGameStore.getState();
            expect(state.mode).toBe('manual');
        });
    });

    describe('updateSettings', () => {
        it('should update animation speed', () => {
            const { updateSettings } = useGameStore.getState();

            updateSettings({ animationSpeed: 100 });

            const state = useGameStore.getState();
            expect(state.settings.animationSpeed).toBe(100);
        });

        it('should update preferClosed setting', () => {
            const { updateSettings } = useGameStore.getState();

            updateSettings({ preferClosed: true });

            const state = useGameStore.getState();
            expect(state.settings.preferClosed).toBe(true);
        });

        it('should update multiple settings at once', () => {
            const { updateSettings } = useGameStore.getState();

            updateSettings({
                animationSpeed: 50,
                showPath: false,
                preferClosed: true
            });

            const state = useGameStore.getState();
            expect(state.settings.animationSpeed).toBe(50);
            expect(state.settings.showPath).toBe(false);
            expect(state.settings.preferClosed).toBe(true);
        });
    });
});
