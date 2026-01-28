import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SquareProps {
    isBlack: boolean;
    isValidMove: boolean;
    isVisited: boolean;
    isCurrent: boolean;
    moveNumber: number | null;
    onClick: () => void;
    label?: string; // a1, h8, etc. - mostly for debug or corner labels
}

export const Square = ({
    isBlack,
    isValidMove,
    isVisited,
    isCurrent,
    moveNumber,
    onClick,
    label
}: SquareProps) => {
    return (
        <div
            onClick={onClick}
            className={twMerge(
                "relative w-full h-full flex items-center justify-center text-lg font-bold select-none cursor-pointer transition-colors duration-200 border border-husain-bg/10",
                isBlack ? "bg-husain-earth text-husain-canvas" : "bg-husain-canvas text-husain-earth",
                isValidMove && !isVisited && "ring-inset ring-4 ring-husain-saffron/80 hover:bg-husain-saffron/20",
                isCurrent && "ring-inset ring-4 ring-husain-crimson shadow-lg shadow-husain-crimson/50"
            )}
        >
            {/* Coordinate Label (optional, could be added for corners) */}
            {label && (
                <span className="absolute bottom-0.5 right-1 text-[8px] opacity-40 font-normal">
                    {label}
                </span>
            )}

            {/* Move Number */}
            {moveNumber !== -1 && (
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-0.5 left-1 text-sm font-bold opacity-90"
                >
                    {moveNumber}
                </motion.span>
            )}

            {/* Knight Icon for Current Position */}
            {isCurrent && (
                <motion.div
                    layoutId="knight-piece"
                    className="absolute inset-0 flex items-center justify-center text-4xl z-20 pointer-events-none"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ backgroundColor: 'transparent' }}
                >
                    <span className="drop-shadow-lg" style={{
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                        color: 'rgb(var(--color-crimson))'
                    }}>
                        ♞
                    </span>
                </motion.div>
            )}

            {/* Valid Move Indicator (Dot) */}
            {isValidMove && !isVisited && !isCurrent && (
                <div className="absolute w-3 h-3 bg-emerald-400 rounded-full opacity-50" />
            )}
        </div>
    );
};
