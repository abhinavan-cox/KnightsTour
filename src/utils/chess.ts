import { Position } from '../types';

export const COL_LABELS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const ROW_LABELS = ['8', '7', '6', '5', '4', '3', '2', '1'];

export const toAlgebraic = (pos: Position): string => {
    const [x, y] = pos;
    return `${COL_LABELS[x]}${ROW_LABELS[y]}`;
};

export const isValidPos = (pos: Position): boolean => {
    return pos[0] >= 0 && pos[0] < 8 && pos[1] >= 0 && pos[1] < 8;
};
