# Knight's Tour - TODO

## Missing Files (Specified in CLAUDE.md)

- [ ] **`src/algorithms/backtrack.ts`** - Fallback algorithm with pruning
  - Warnsdorff has ~99.9% success rate, but rare failures have no recovery
  - Implement depth-first search with backtracking as fallback

- [ ] **`src/components/Knight.tsx`** - Dedicated animated knight component
  - Currently knight (♞) is rendered directly in Square.tsx
  - Could extract for better separation of concerns

- [ ] **`src/components/HintOverlay.tsx`** - Valid move indicators overlay
  - Currently hints shown as green dots on valid squares
  - Could be a dedicated overlay component

## Bugs & Issues

### Critical

- [ ] **Inefficient dynamic import** in `useAnimation.ts:12`
  - `import('../algorithms/warnsdorff')` happens inside `setInterval`
  - Causes repeated module resolution every animation frame
  - Fix: Move import to top of file or use static import

### Major

- [ ] **Algorithm steps not displayed**
  - `stats.algorithmSteps` counter increments in store
  - Not shown anywhere in the UI
  - Add to Stats.tsx component

### Minor

- [ ] **Animation speed range mismatch**
  - Implementation: 50-1000ms
  - Spec (CLAUDE.md): 100-2000ms
  - Decide which range is preferred and align

- [ ] **Confusing coordinate handling** in `Board.tsx`
  - `isValid(r, c)` checks `m[0] === c && m[1] === r` (inverted)
  - Works but is confusing to read
  - Consider refactoring for clarity

- [ ] **Misleading comment** in `useKnightTour.ts:33`
  - Comment says "64th position is set" but code path is unreachable
  - The solved state is handled by `makeMove()` in gameStore
  - Remove or clarify the comment

- [ ] **Board mutation in `warnsdorff.ts`**
  - Uses `999` marker for temporary calculations
  - Works but could use a cleaner approach (e.g., Set for visited)

## Code Quality Improvements

- [ ] Add unit tests for algorithms and utilities
- [ ] Add integration tests for game flow
- [ ] Improve error handling for edge cases
- [ ] Add input validation on Position arrays
- [ ] Remove unused `isTourComplete()` function or use it

## Completed

- [x] Add time elapsed tracking and display in Stats component
