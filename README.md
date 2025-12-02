# Queries E Dictionary

## Overview
Queries E Dictionary is a single-page React + TypeScript playground for exploring a curated list of words. Users type letters or substrings to see how many entries match each filter, while interactive charts visualize the distribution in real time. The experience is entirely frontend: each session loads the dataset from `public/words.json`, so no servers or APIs are required beyond the standard CRA tooling. Updating the sample list is as simple as editing the JSON file and reloading the page.

## Features
- Character-driven filters covering start letter, start substring, end letter, character frequency, and repeated-letter detection.
- Instant feedback via a MobX observable store that keeps numeric counters and charts synchronized as you type.
- Toggleable bar and doughnut visualizations built with Chart.js 3 and react-chartjs-2.
- Emotion-styled inputs and chart containers that stay responsive across viewport sizes.
- Editable dataset supplied through the static `public/words.json` file for quick experimentation.

## Tech Stack
- React 18 with Create React App 5 (`react-scripts`)
- TypeScript
- MobX 6 + `mobx-react-lite`
- Emotion
- Chart.js 3 + `react-chartjs-2`

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the development server**
   ```bash
   npm start
   ```
3. **Build the production bundle**
   ```bash
   npm run build
   ```

## Demo: 
[Live demo](https://queries-dictionary.vercel.app/)
