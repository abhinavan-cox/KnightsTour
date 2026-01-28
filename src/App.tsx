import { useRef } from 'react';
import { Board } from './components/Board';
import { Controls } from './components/Controls';
import { Stats } from './components/Stats';
import { MoveHistory } from './components/MoveHistory';
import { useKnightTour } from './hooks/useKnightTour';

function App() {
    const { handleSquareClick } = useKnightTour();
    // We use a ref to prevent re-renders of the entire app, 
    // though Zustand handles fine-grained updates in components logic anyway.

    return (
        <div className="min-h-screen bg-husain-bg text-husain-canvas/90 flex flex-col md:flex-row items-center justify-center p-4 gap-8 font-sans">

            {/* Left Panel: Game Board */}
            <div className="flex-shrink-0">
                <div className="mb-4">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-husain-saffron to-husain-crimson bg-clip-text text-transparent tracking-tight">
                        Knight's Tour
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Visit every square exactly once.
                    </p>
                </div>

                <Board onSquareClick={handleSquareClick} />
            </div>

            {/* Right Panel: Controls & Info */}
            <div className="flex flex-col gap-6 w-full max-w-sm">
                <Controls />
                <Stats />
                <MoveHistory />
            </div>


            {/* Footer */}
            <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2 text-xs text-slate-500 font-mono">
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
