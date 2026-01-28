# Knight's Tour Visualizer

A browser-based application that visualizes the Knight's Tour problem with both auto-solve and manual play modes. The knight must visit all 64 squares exactly once from a user-selected starting position.

## Features

### Game Modes
- **Auto-Solve Mode**: Algorithm finds solution using Warnsdorff's heuristic and animates it step-by-step
- **Manual Mode**: Click valid squares to move the knight, with validation and optional hints

### Board Interaction
- 8×8 chessboard with coordinate labels (a-h, 1-8)
- Click any square to set starting position
- Visual highlighting of valid moves (knight's L-shape pattern)
- Move animation with configurable speed (100ms - 2000ms)

### Move Annotation
- Sequential move numbers displayed on visited squares
- Move history panel showing algebraic notation (e.g., "1. Nb1→c3")
- Current position highlighted distinctly
- Optional path trace connecting visited squares

### End-Game Statistics
- Total moves completed
- Time elapsed
- Success/failure status
- Squares visited vs. remaining
- Backtrack count (manual mode)
- Algorithm iterations (auto mode)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| State | Zustand |
| Build | Vite |
| Container | Docker + nginx |

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Docker

```bash
# Build and run with docker-compose
docker-compose up --build

# Or build manually
docker build -t knights-tour .
docker run -p 3000:80 knights-tour
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── components/     # React components (Board, Square, Knight, etc.)
├── hooks/          # Custom hooks (useKnightTour, useAnimation)
├── algorithms/     # Warnsdorff's heuristic and backtracking solver
├── store/          # Zustand state management
├── utils/          # Chess notation and validation utilities
├── types/          # TypeScript interfaces
├── App.tsx
└── main.tsx
```

## Algorithm

The auto-solver uses **Warnsdorff's Heuristic**:
- From current square, move to the square with fewest onward moves
- Tie-breaker: prefer corners/edges (fewer escape routes)
- Achieves ~99.9% success rate without backtracking

## License

MIT
