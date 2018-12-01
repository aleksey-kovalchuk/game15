export const MOVE_CELL = 'MOVE_CELL';
export const RESET = 'RESET';
export const MOVE_BACK = 'MOVE_BACK';
export const SAVE_CELLS = 'SAVE_CELLS';
export const RESTORE_CELLS = 'RESTORE_CELLS';

export function moveCell(item) {
  return {
    type: MOVE_CELL,
    payload: item,
  }
};

export function resetGame(simple) {
  return {
    type: RESET,
    payload: simple,
  }
};

export function moveBack() {
  return {
    type: MOVE_BACK,
  }
}

export function saveCells(cells) {
  return {
    type: SAVE_CELLS,
    payload: cells
  }
}

export function restoreCells() {
  return {
    type: RESTORE_CELLS,
  }
}