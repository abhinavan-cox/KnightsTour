import { useRef } from 'react';
import { Board } from './components/Board';
import { Controls } from './components/Controls';
import { Stats } from './components/Stats';
import { MoveHistory } from './components/MoveHistory';
import { PaletteSelector } from './components/PaletteSelector';
import { CollapsiblePanel } from './components/CollapsiblePanel';
import { useKnightTour } from './hooks/useKnightTour';
import { useTheme } from './hooks/useTheme';
import { palettes } from './config/palettes';

function App() {
    useTheme(); // Apply theme based on selected palette
    const { handleSquareClick, settings } = useKnightTour();
    const currentPalette = palettes[settings.selectedPalette];

    return (
        <div className="min-h-screen bg-slate-900 text-husain-canvas/90 flex flex-col font-sans overflow-x-hidden overflow-y-auto">

            {/* SECTION 1: TOP - Board & Header */}
            <div className="flex-shrink-0 flex flex-col items-center pt-8 pb-4 bg-slate-900 z-10">
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-husain-saffron to-husain-crimson bg-clip-text text-transparent tracking-tight">
                        Knight's Tour v6
                    </h1>
                </div>
                <div className="transform origin-top">
                    <Board onSquareClick={handleSquareClick} />
                </div>
            </div>

            {/* SECTION 2: MIDDLE - Controls & Palette (Side-by-Side) */}
            <div className="flex-shrink-0 flex flex-wrap justify-center gap-6 p-4 bg-slate-800/30 border-y border-white/5 w-full">
                <div className="w-full max-w-sm">
                    <Controls />
                </div>
                <div className="w-full max-w-sm">
                    <CollapsiblePanel
                        title="Color Palette"
                        defaultOpen={false}
                        subtitle={
                            <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: currentPalette.colors.saffron }} />
                                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: currentPalette.colors.crimson }} />
                                </div>
                                <span className="text-husain-canvas/80 text-xs font-medium">{currentPalette.displayName}</span>
                            </div>
                        }
                    >
                        <PaletteSelector />
                    </CollapsiblePanel>
                </div>
            </div>

            {/* SECTION 3: BOTTOM - Stats & History (Side-by-Side) */}
            <div className="flex-grow flex flex-wrap justify-center items-start gap-6 p-6 bg-slate-900/50 w-full mb-8">
                <div className="w-full max-w-sm">
                    <CollapsiblePanel title="Statistics" defaultOpen={true}>
                        <Stats />
                    </CollapsiblePanel>
                </div>

                <div className="w-full max-w-sm">
                    <CollapsiblePanel title="Move History" defaultOpen={true}>
                        <MoveHistory />
                    </CollapsiblePanel>
                </div>
            </div>

            {/* Footer */}
            <div className="w-full flex flex-col items-center gap-2 text-xs text-slate-500 font-mono mt-auto pb-8">
                <a
                    href="https://knightstour.shalusri.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-400 transition-colors flex items-center gap-1"
                >
                    knightstour.shalusri.com
                </a>
                <a
                    href="https://github.com/knightsri/KnightsTour"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-400 transition-colors flex items-center gap-1"
                >
                    View Source on GitHub
                </a>
            </div>
        </div >
    );
}

export default App;
