export const MOVE_CELL = 'MOVE_CELL';
export const RESET = 'RESET';
export const MOVE_BACK = 'MOVE_BACK';

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