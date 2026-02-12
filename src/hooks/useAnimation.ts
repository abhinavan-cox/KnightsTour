import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

export const useAnimation = () => {
    const {
        mode,
        status,
        settings,
        makeMove,
        knightPosition,
        autoPath,
        setAutoPath,
        setStatus,
        setIsClosedTour
    } = useGameStore();

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Path calculation effect
    useEffect(() => {
        if (status === 'playing' && mode === 'auto' && !autoPath && knightPosition) {
            import('../algorithms/warnsdorff').then(({ solveKnightsTour }) => {
                const result = solveKnightsTour(knightPosition, settings.preferClosed);
                if (result) {
                    // Path includes the start position as the first element
                    // The first move is already made by setStartParams, so we slice it
                    setAutoPath(result.path.slice(1));
                    setIsClosedTour(result.isClosed);
                } else {
                    setStatus('failed');
                    setIsClosedTour(false);
                }
            });
        }
    }, [status, mode, autoPath, knightPosition, settings.preferClosed, setAutoPath, setStatus, setIsClosedTour]);

    // Animation effect
    useEffect(() => {
        if (status === 'playing' && mode === 'auto' && autoPath && autoPath.length > 0) {
            timerRef.current = setInterval(() => {
                const state = useGameStore.getState();
                const currentPath = state.autoPath;

                if (currentPath && currentPath.length > 0) {
                    const nextMove = currentPath[0];
                    makeMove(nextMove);
                    setAutoPath(currentPath.slice(1));
                } else {
                    if (timerRef.current) clearInterval(timerRef.current);
                }
            }, settings.animationSpeed);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [status, mode, autoPath, settings.animationSpeed, makeMove, setAutoPath]);
};
