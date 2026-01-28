import { useGameStore } from '../store/gameStore';
import { Square } from './Square';
import { COL_LABELS, ROW_LABELS } from '../utils/chess';
import { getValidMoves } from '../utils/validation';
import { Position } from '../types';

interface BoardProps {
    onSquareClick: (pos: Position) => void;
}

export const Board = ({ onSquareClick }: BoardProps) => {
    const { board, knightPosition, status, moveHistory, settings } = useGameStore();

    const validMoves: Position[] = knightPosition && status === 'playing'
        ? getValidMoves(knightPosition, board)
        : [];

    const isValid = (r: number, c: number) =>
        validMoves.some(m => m[0] === c && m[1] === r);

    // Calculate polyline points for the path
    const pathPoints = moveHistory.map(m => `${m.to[0] + 0.5},${m.to[1] + 0.5}`).join(' ');

    return (
        <div className="relative p-1 bg-slate-800 rounded-lg shadow-2xl">
            {/* Rank Labels (Left) */}
            <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-around py-2 text-slate-400 font-mono text-sm">
                {ROW_LABELS.map(r => <span key={r}>{r}</span>)}
            </div>

            {/* File Labels (Bottom) */}
            <div className="absolute left-0 right-0 -bottom-6 flex justify-around px-2 text-slate-400 font-mono text-sm">
                {COL_LABELS.map(c => <span key={c}>{c}</span>)}
            </div>

            <div className="relative grid grid-cols-8 gap-0 bg-husain-card border-4 border-husain-card w-[min(80vw,600px)] h-[min(80vw,600px)]">

                {/* Render Squares */}
                {Array.from({ length: 8 }).map((_, y) => (
                    Array.from({ length: 8 }).map((_, x) => {
                        const isBlack = (x + y) % 2 === 1;
                        const moveNum = board[x][y];
                        const isVisited = moveNum !== -1;
                        const isCurrent = knightPosition?.[0] === x && knightPosition?.[1] === y;
                        const isVal = isValid(y, x);

                        return (
                            <Square
                                key={`${x}-${y}`}

                                isBlack={isBlack}
                                moveNumber={isVisited ? moveNum : null}
                                isVisited={isVisited}
                                isCurrent={isCurrent}
                                isValidMove={isVal}
                                label={COL_LABELS[x] + ROW_LABELS[y]}
                                onClick={() => onSquareClick([x, y])}
                            />
                        );
                    })
                ))}

                {/* Path Overlay - Rendered AFTER squares but with pointer-events-none */}
                {settings.showPath && moveHistory.length > 1 && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 8 8">
                        <polyline
                            points={pathPoints}
                            fill="none"
                            stroke="#D50000"
                            strokeWidth="0.08"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-80 drop-shadow-md"
                        />
                    </svg>
                )}
            </div>
        </div>
    );
};
