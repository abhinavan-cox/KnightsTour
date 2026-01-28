import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

export const useAnimation = () => {
    const {
        mode,
        status,
        settings,
        makeMove,
        knightPosition,
        board
    } = useGameStore();

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (status === 'playing' && mode === 'auto') {
            import('../algorithms/warnsdorff').then(({ getBestMove }) => {
                timerRef.current = setInterval(() => {
                    if (!knightPosition) return;

                    const nextMove = getBestMove(knightPosition, board);

                    if (nextMove) {
                        makeMove(nextMove);
                    } else {
                        // If no moves, check if solved
                        // This logic is simple; the store updates status on the 64th move
                        // But if we are stuck before 64, we need to handle it.
                        // The store check handles 'solved'. If we run out of moves here and not solved...
                        // We'll let the next tick handle it or update store to 'stuck' separately? 
                        // For now, let's rely on the store 'solved' check which happens inside makeMove.
                        // If we get here and no move, it's either done or stuck.

                        // Let's explicitly check:
                        const isDone = useGameStore.getState().status === 'solved'; // check fresh state
                        if (!isDone) {
                            useGameStore.getState().setStatus('stuck');
                        }

                        if (timerRef.current) clearInterval(timerRef.current);
                    }
                }, settings.animationSpeed);
            });
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [status, mode, settings.animationSpeed, knightPosition, board, makeMove]);
};
