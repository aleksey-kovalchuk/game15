import { moveHandler, createCells, calcPositions, getCorrect } from '../utils';
import { MOVE_CELL, RESET, MOVE_BACK } from '../actions'

const positions = calcPositions();
const cells = createCells();
const correct = getCorrect();
cells.forEach((d, i) => Object.assign(d, positions[i]));

export const initialState = {
  cells,
  winner: false,
  history: [],
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case MOVE_CELL:

      // save history
      const prev = JSON.stringify(state.cells);
      const newHistory = state.history.slice();
      newHistory.push(prev);

      const newCells = moveHandler(action.payload, state.cells);
      const test = state.cells.slice().sort((a,b) => a.order - b.order).map(d => d.number);
      return {
        ...state,
        cells: newCells,
        winner: JSON.stringify(test) === JSON.stringify(correct),
        history: newHistory,
      }
    case RESET:
      const reset = createCells(action.payload);
      reset.forEach((d, i) => Object.assign(d, positions[i]));
      return {
        ...state,
        cells: reset,
        winner: false,
      }
    case MOVE_BACK:
      const prevCells = state.history[state.history.length - 1];
      const cropHistory = state.history.slice();
      cropHistory.pop();
      return {
        ...state,
        cells: JSON.parse(prevCells),
        history: cropHistory,
      }
    default:
      return state
  }
}