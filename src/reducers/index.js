import { moveHandler, createCells, calcPositions } from '../utils';
import { MOVE_CELL, RESET } from '../actions'

const positions = calcPositions();
const cells = createCells();

cells.forEach((d, i) => Object.assign(d, positions[i]));

export const initialState = {
  cells
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case MOVE_CELL:
      const newCells = moveHandler(action.payload, state.cells);


      const test = cells.slice().sort((a,b) => a.order - b.order).map(d => d.number);
      console.log('>>>>>>>> REDUCER MOVE_CELL >>>>>>', test);



      return {
        ...state,
        cells: newCells
      }
    case RESET:
      const reset = createCells();
      reset.forEach((d, i) => Object.assign(d, positions[i]));
      return {
        ...state,
        cells: reset
      }
    default:
      return state
  }
}