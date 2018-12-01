import { moveHandler, createCells, calcPositions, getCorrect } from '../utils';
import { MOVE_CELL, RESET, MOVE_BACK, SAVE_CELLS, RESTORE_CELLS, SET_SIZE } from '../actions'

const size = window.innerWidth > 400 ? 400 : 300;

const positions = calcPositions(size);
const cells = createCells();
const correct = getCorrect();
cells.forEach((d, i) => Object.assign(d, positions[i]));

export const initialState = {
  cells,
  winner: false,
  history: [],
  saved: null,
  size
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
        history: [],
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
    case SAVE_CELLS:
      return {
        ...state,
        saved: action.payload,
      }
    case RESTORE_CELLS:
      const restoredCells = JSON.parse(state.saved);
      return {
        ...state,
        cells: restoredCells,
        history: [],
        saved: null,
      }
    case SET_SIZE:
      const resizedPositions = calcPositions(action.payload);
      const resizedCells = state.cells.slice();
      resizedCells.forEach((d, i) => Object.assign(d, resizedPositions[i]));
      return {
        ...state,
        cells: resizedCells,
        size: action.payload
      }
    default:
      return state
  }
}