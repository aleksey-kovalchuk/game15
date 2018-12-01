export function calcPositions(size) {
  const step = size/4;
  const positions = [];

  for(let i = 0; i < 4; i++) {
    let x = step * i;
    for (let i = 0; i < 4; i++) {
      positions.push({
        x: x,
        y: step * i
      });
    }
  }

  return positions;
}

export function moveHandler(item, cellsOrigin) {
  const cells = cellsOrigin.slice();
  const currentCell = { ...item };

  const cellIndex = cells.findIndex(d => d.number === currentCell.number);
  const emptyIndex = cells.findIndex(d => d.number === 16);

  function setCell(target, source) {
    target.x = source.x;
    target.y = source.y;
    target.order = source.order;
  }

  setCell(cells[cellIndex], cells[emptyIndex]);
  setCell(cells[emptyIndex], currentCell);

  return cells;
}

export function createCells(simple) {
  const cells = [];

  for(let i = 1; i < 17; i++) {
    cells.push({
      number: i
    });
  }

  const result = simple ? cells.slice() : cells.sort((a,b) => Math.random() - 0.5);

  if (simple) {
    result[14] = cells[15];
    result[15] = cells[14];
  }

  result.forEach((d, i) => d.order = i);
  return result;
}

export function getCorrect() {
  return new Array(16).fill('').map((d,i) => i + 1);
}