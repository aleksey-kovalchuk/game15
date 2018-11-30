import React, { Component } from 'react';
import styled from 'styled-components';
import Cell from './Cell';

const Wrap = styled.div`
  padding: 100px;
`;

const GameBox = styled.div`
  width: 400px;
  height: 400px;
  border: 1px solid #333333;
  position: relative;
  background: #333333;
`;










class Game extends Component {

  state = {
    cells: []
  }

  componentDidMount() {
    const positions = this.calcPositions();
    const cells = this.createCells();
    cells.forEach((d, i) => Object.assign(d, positions[i]));
    this.setState({ cells });
  }




  createCells() {
    const cells = [];
    for(let i = 1; i < 17; i++) {
      cells.push({
        number: i
      });
    }
    const result =  cells.sort((a,b) => Math.random() - 0.5);
    result.forEach((d, i) => d.order = i);
    return result;
  }

  calcPositions() {
    const size = 400;
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








  cellClick(item) {
    const cells = this.state.cells.slice();
    const currentCell = {...item};
    const emptyOrder = cells.find(e => e.number === 16).order;

    const allows = [emptyOrder - 1, emptyOrder + 1, emptyOrder - 4, emptyOrder + 4];
    if (allows.indexOf(item.order) === -1) return false;
    // =================================================

    const cellIndex = cells.findIndex(d => d.number === item.number);
    const emptyIndex = cells.findIndex(d => d.number === 16);

    function setCell(target, source) {
      target.x = source.x;
      target.y = source.y;
      target.order = source.order;
    }

    setCell(cells[cellIndex], cells[emptyIndex]);
    setCell(cells[emptyIndex], currentCell);

    // console.log('>>>>>>', cells.map(d => d.number));

    this.setState({cells});
  }










  render() {

    const { cells } = this.state;



    return (
      <Wrap>
        <GameBox>
          {
            cells.map((item, i) => (
              <Cell
                key={i}
                top={item.x}
                left={item.y}
                size="100"
                number={item.number}
                clicked={() => this.cellClick(item, i)}
              />
            ))
          }
        </GameBox>
      </Wrap>
    );
  }
}

export default Game;