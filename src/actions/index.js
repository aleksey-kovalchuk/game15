export const MOVE_CELL = 'MOVE_CELL';
export const RESET = 'RESET';

export function moveCell(item) {
  return {
    type: MOVE_CELL,
    payload: item
  }
};

export function resetGame() {
  return {
    type: RESET,
  }
};