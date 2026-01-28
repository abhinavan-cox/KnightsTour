# Knight's Tour Visualizer — Technical Specification

## Overview

A browser-based application that visualizes the Knight's Tour problem with both auto-solve and manual play modes. The knight must visit all 64 squares exactly once from a user-selected starting position.

## Core Features

### Mode Selection

- **Auto-Solve Mode**: Algorithm finds solution and animates it step-by-step
- **Manual Mode**: User clicks valid squares to move the knight, with validation and optional hints

### Board Interaction

- 8×8 chessboard with coordinate labels (a-h, 1-8)
- Click any square to set starting position
- Visual highlighting of valid moves (knight's L-shape pattern)
- Move animation with configurable speed

### Move Annotation

- Sequential move numbers displayed on visited squares
- Move history panel showing algebraic notation (e.g., "1. Nb1→c3")
- Current position highlighted distinctly
- Path trace option (lines connecting visited squares)

### Statistics (End of Game)

- Total moves completed
- Time elapsed
- Success/failure status
- Squares visited vs. remaining
- Backtrack count (manual mode)
- Algorithm iterations (auto mode)

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Frontend** | React 18 + TypeScript | Component state fits well; you're already using React in CondoFlow |
| **Styling** | Tailwind CSS | Rapid prototyping, consistent with your current stack |
| **Animation** | Framer Motion | Smooth knight movement, spring physics |
| **State** | Zustand | Lightweight, no Redux boilerplate |
| **Build** | Vite | Fast HMR, simple config |
| **Container** | Docker + nginx | Production-ready static serving |

---

## Architecture

```
src/
├── components/
│   ├── Board.tsx           # 8x8 grid rendering
│   ├── Square.tsx          # Individual square with state
│   ├── Knight.tsx          # Animated knight piece
│   ├── MoveHistory.tsx     # Algebraic notation list
│   ├── Controls.tsx        # Mode toggle, speed, reset
│   ├── Stats.tsx           # End-game statistics
│   └── HintOverlay.tsx     # Valid move indicators
├── hooks/
│   ├── useKnightTour.ts    # Core game logic
│   └── useAnimation.ts     # Movement timing
├── algorithms/
│   ├── warnsdorff.ts       # Primary solver (O(n²) heuristic)
│   └── backtrack.ts        # Fallback with pruning
├── store/
│   └── gameStore.ts        # Zustand state
├── utils/
│   ├── chess.ts            # Coordinate conversion
│   └── validation.ts       # Move legality checks
├── types/
│   └── index.ts            # TypeScript interfaces
├── App.tsx
└── main.tsx
```

---

## State Shape

```typescript
interface GameState {
  mode: 'auto' | 'manual';
  board: number[][]; // -1 = unvisited, 0+ = move number
  knightPosition: [number, number];
  moveHistory: Move[];
  validMoves: [number, number][];
  status: 'setup' | 'playing' | 'solved' | 'stuck';
  stats: {
    startTime: number;
    endTime: number | null;
    backtracks: number;
    algorithmSteps: number;
  };
  settings: {
    animationSpeed: number; // ms per move
    showPath: boolean;
    showHints: boolean;
  };
}
```

---

## Algorithm Notes

**Warnsdorff's Heuristic** (auto-solve):

- From current square, move to the square with fewest onward moves
- Tie-breaker: prefer corners/edges (fewer escape routes)
- ~99.9% success rate, no backtracking needed

**Manual Mode Validation**:

- Highlight only legal L-shaped moves from current position
- Detect "stuck" state (no valid moves, board incomplete)
- Optional: show Warnsdorff hint (best next move)

---

## Docker Configuration

**Dockerfile** (multi-stage build):

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**docker-compose.yml**:

```yaml
version: '3.8'
services:
  knights-tour:
    build: .
    ports:
      - "3000:80"
    restart: unless-stopped
```

**nginx.conf**:

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    gzip on;
    gzip_types text/css application/javascript application/json;
}
```

---

## Development Commands

```bash
# Local development
npm install
npm run dev

# Docker build & run
docker-compose up --build

# Production build test
docker build -t knights-tour .
docker run -p 3000:80 knights-tour
```

---

## UI Wireframe (Text)

```
┌─────────────────────────────────────────────────────────┐
│  Knight's Tour                    [Auto] [Manual]       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│    a   b   c   d   e   f   g   h      Move History      │
│  ┌───┬───┬───┬───┬───┬───┬───┬───┐   ┌─────────────┐   │
│ 8│   │ 2 │   │   │   │   │   │   │   │ 1. Ng1      │   │
│  ├───┼───┼───┼───┼───┼───┼───┼───┤   │ 2. Ng1→f3   │   │
│ 7│   │   │   │ * │   │ * │   │   │   │ 3. Nf3→e5   │   │
│  ├───┼───┼───┼───┼───┼───┼───┼───┤   │ ...         │   │
│ 6│   │   │ * │   │   │   │ * │   │   └─────────────┘   │
│  ├───┼───┼───┼───┼───┼───┼───┼───┤                     │
│ 5│   │   │   │   │ ♞ │   │   │   │   Speed: [━━━○──]   │
│  ├───┼───┼───┼───┼───┼───┼───┼───┤   ☑ Show hints      │
│ 4│   │   │ * │   │   │   │ * │   │   ☑ Show path       │
│  ├───┼───┼───┼───┼───┼───┼───┼───┤                     │
│ 3│   │   │   │ * │   │ * │   │   │   [▶ Start] [Reset] │
│  ├───┼───┼───┼───┼───┼───┼───┼───┤                     │
│ 2│   │ 1 │   │   │   │   │   │   │   Moves: 3/64       │
│  ├───┼───┼───┼───┼───┼───┼───┼───┤   Time: 00:42       │
│ 1│   │   │   │   │   │   │   │   │                     │
│  └───┴───┴───┴───┴───┴───┴───┴───┘                     │
│                                                         │
│  * = valid moves    ♞ = knight    [n] = move number    │
└─────────────────────────────────────────────────────────┘
```

---

## Acceptance Criteria

1. User can select starting square by clicking
2. Auto-solve completes 64-move tour with animation
3. Manual mode validates moves and detects stuck state
4. Move numbers persist on visited squares
5. Stats display on completion/failure
6. Animation speed is adjustable (100ms - 2000ms)
7. Reset returns to starting position selection
8. Docker container runs on port 3000
9. Responsive layout (desktop primary, tablet acceptable)

---
