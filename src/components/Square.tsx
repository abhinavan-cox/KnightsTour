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
                isBlack ? "bg-husain-earth text-husain-canvas" : "bg-husain-canvas text-husain-earth", // Earth & Canvas
                isValidMove && !isVisited && "ring-inset ring-4 ring-husain-saffron/80 hover:bg-husain-saffron/20",
                // isVisited: We keep the base background to preserve checkerboard. 
                // The path line and numbers indicate visited state.
                isCurrent && "bg-husain-crimson text-white z-10 shadow-lg shadow-husain-crimson/50" // Current is Crimson
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
                    className="absolute inset-0 flex items-center justify-center text-4xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    ♞
                </motion.div>
            )}

            {/* Valid Move Indicator (Dot) */}
            {isValidMove && !isVisited && !isCurrent && (
                <div className="absolute w-3 h-3 bg-emerald-400 rounded-full opacity-50" />
            )}
        </div>
    );
};
