import { useGameStore } from '../store/gameStore';
import { getValidMoves } from '../utils/validation';
import { Position } from '../types';
import { useAnimation } from './useAnimation';
import { useEffect } from 'react';

export const useKnightTour = () => {
    const store = useGameStore();

    // Initialize animation engine
    useAnimation();

    const handleSquareClick = (pos: Position) => {
        if (store.status === 'setup') {
            store.setStartParams(pos);
        } else if (store.status === 'playing' && store.mode === 'manual') {
            if (store.knightPosition) {
                const validMoves = getValidMoves(store.knightPosition, store.board);
                const isValid = validMoves.some(m => m[0] === pos[0] && m[1] === pos[1]);

                if (isValid) {
                    store.makeMove(pos);
                }
            }
        }
    };

    // Check for stuck state in manual mode
    useEffect(() => {
        if (store.mode === 'manual' && store.status === 'playing' && store.knightPosition) {
            const validMoves = getValidMoves(store.knightPosition, store.board);
            if (validMoves.length === 0) {
                if (store.moveHistory.length === 63) { // 64th position is set
                    // Solved handled by reducer
                } else {
                    store.setStatus('stuck');
                }
            }
        }
    }, [store.knightPosition, store.status, store.mode, store.board]);

    return {
        ...store,
        handleSquareClick
    };
};
