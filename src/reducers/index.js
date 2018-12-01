import { moveHandler, createCells, calcPositions, getCorrect } from '../utils';
import { MOVE_CELL, RESET } from '../actions'

const positions = calcPositions();
const cells = createCells();
const correct = getCorrect();
cells.forEach((d, i) => Object.assign(d, positions[i]));

export const initialState = {
  cells,
  winner: false,
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case MOVE_CELL:
      const newCells = moveHandler(action.payload, state.cells);
      const test = state.cells.slice().sort((a,b) => a.order - b.order).map(d => d.number);
      return {
        ...state,
        cells: newCells,
        winner: JSON.stringify(test) === JSON.stringify(correct)
      }
    case RESET:
      const reset = createCells(action.payload);
      reset.forEach((d, i) => Object.assign(d, positions[i]));
      return {
        ...state,
        cells: reset,
        winner: false,
      }
    default:
      return state
  }
}