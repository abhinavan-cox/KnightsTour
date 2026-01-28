import { useGameStore } from '../store/gameStore';

export const Stats = () => {
    const { moveHistory, status, mode, stats } = useGameStore();

    const moveCount = moveHistory.length;
    const progress = Math.round((moveCount / 64) * 100);

    return (

        <div className="bg-husain-card p-6 rounded-lg shadow-lg w-full max-w-sm flex flex-col gap-4 border border-husain-bg/20">
            <h2 className="text-xl font-bold text-husain-canvas">Statistics</h2>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-husain-bg p-3 rounded border border-husain-earth/20">
                    <div className="text-xs text-husain-canvas/50 uppercase tracking-wider">Moves</div>
                    <div className="text-2xl font-mono text-husain-canvas">{moveCount} <span className="text-husain-canvas/40 text-lg">/ 64</span></div>
                </div>
                <div className="bg-husain-bg p-3 rounded border border-husain-earth/20">
                    <div className="text-xs text-husain-canvas/50 uppercase tracking-wider">Status</div>
                    <div className={`text-lg font-bold uppercase ${status === 'solved' ? 'text-emerald-500' :
                        status === 'stuck' ? 'text-husain-crimson' :
                            status === 'playing' ? 'text-husain-saffron' : 'text-husain-canvas/50'
                        }`}>
                        {status}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-husain-bg h-2 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-husain-saffron to-husain-crimson transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {mode === 'manual' && stats.backtracks > 0 && (
                <div className="text-sm text-husain-saffron">Backtracks: {stats.backtracks}</div>
            )}
        </div>
    );
}
