import { useRef, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

export const MoveHistory = () => {
    const { moveHistory } = useGameStore();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [moveHistory]);

    if (moveHistory.length === 0) {
        return (
            <div className="bg-husain-card p-6 rounded-lg shadow-lg w-full max-w-sm min-h-[150px] flex items-center justify-center text-husain-canvas/40 italic text-sm border border-husain-bg/10">
                No moves yet
            </div>
        );
    }

    return (
        <div className="bg-husain-card p-4 rounded-lg shadow-lg w-full max-w-sm flex flex-col gap-2 border border-husain-bg/10">
            <h3 className="text-sm font-bold text-husain-canvas uppercase tracking-wider">History</h3>
            <div
                ref={scrollRef}
                className="h-32 overflow-y-auto pr-2 space-y-1 scrollbar-thin scrollbar-thumb-husain-charcoal scrollbar-track-husain-bg"
            >
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm font-mono">
                    {moveHistory.map((move) => (
                        <div key={move.moveNumber} className="flex gap-2">
                            <span className="text-husain-canvas/40 w-6 text-right">{move.moveNumber}.</span>
                            <span className="text-husain-saffron">{move.notation}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
