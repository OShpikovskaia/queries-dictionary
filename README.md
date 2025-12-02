# Queries E Dictionary

A single-page React + TypeScript playground that lets you explore a small dictionary of words. Users type letters or substrings, and the app instantly shows how many words match each filter and visualizes the counts in Chart.js bar/doughnut charts. Data is served locally through `json-server`, so the project behaves like a mini full-stack app without an actual backend.

## Features
- Character-based word filters: start letter, start substring, end letter, character frequency, repeated-letter detection.
- Reactive UI powered by MobX observables and `mobx-react-lite` observers.
- Interactive charts with `react-chartjs-2`, toggleable between bar and doughnut views.
- Emotion-styled, responsive inputs and chart containers.
- Mock REST API provided by `json-server` with editable data in `server/db.json`.

## Tech Stack
- React 18, TypeScript, Create React App 5 (`react-scripts`).
- MobX 6 for state management.
- Emotion for styling.
- Chart.js 3 + react-chartjs-2 for visualization.
- json-server (dev dependency) to mock `GET /words`.

## Project Structure
```
queries_e_dictionry/
├── public/                 # CRA static assets
├── src/
│   ├── api/                # Fetch helpers (currently only getWords)
│   ├── components/         # Filter inputs, Chart, shared UI pieces
│   ├── hooks/              # Custom hooks (e.g., useResize)
│   ├── store/              # MobX store + shared types
│   └── App.tsx             # Root component wiring FilterDictionary
├── package.json            # Scripts + dependencies
└── README.md               # You are here
```

## Data Flow
1. `FilterDictionary` mounts and triggers `FiltersStore.loadingData`, which fetches `http://localhost:3001/words` via `getWords`.
2. User input updates the store (`startWordLetter`, `endWordLetter`, etc.). MobX observables keep the counters in sync.
3. `<Observer>` blocks render the latest counts and pass the aggregated array to `<Chart>`.
4. `Chart` rebuilds a Chart.js dataset and renders both bar and doughnut versions on demand.

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the app and mock API (runs CRA + json-server concurrently)**
   ```bash
   npm start
   ```
   - React dev server: http://localhost:3000
   - json-server API: http://localhost:3001/words
3. **Edit data** by changing `server/db.json`; json-server watches the file and hot-reloads.

## Available Scripts
| Command           | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `npm start`       | Runs CRA dev server _and_ json-server together.          |
| `npm run dev`     | Runs only the CRA dev server (needs API running separately). |
| `npm run server`  | Runs json-server on port 3001.                           |
| `npm run build`   | Builds the production bundle into `build/`.              |
| `npm test`        | Runs the CRA test runner (Jest + React Testing Library). |
| `npm run eject`   | CRA eject (irreversible).                                |

## Mock API Contract
- **Base URL:** `http://localhost:3001`
- **Endpoint:** `GET /words` → `[{ id: number, word: string }, ...]`
- Modify `server/db.json` to add or remove words. Each object is read-only after build time unless the server restarts.

## Testing
Execute `npm test` for watch-mode Jest tests. The project ships with CRA defaults plus `@testing-library/jest-dom` in `src/setupTests.ts`. Add component tests under `src/` to extend coverage.

## Development Notes
- MobX store fields drive both numeric counters and the chart; keep label ordering consistent between `FiltersStore` and `Chart`.
- `repeatSymbols` currently builds a regex from user input; escape special characters before expanding usage.
- `Errors` component and `useResize` hook exist but are unused—safe starting points for enhancements (e.g., error states, responsive layout tweaks).

Happy hacking! Update the README whenever the architecture or data contract changes.

## Note
This project is based on Create React App 5 and uses its default build tooling.
npm audit may report vulnerabilities in dev tooling (webpack-dev-server, PostCSS, etc.).
These do not affect the deployed static demo.