import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { moveCell, resetGame, moveBack, saveCells, restoreCells } from '../actions';
import Cell from '../components/Cell';
import WinnerModal from '../components/WinnerModal'

const Wrap = styled.div`
  display: inline-block;
  text-align: center;
`;

const GameBox = styled.div`
  width: 400px;
  height: 400px;
  border: 2px solid #333333;
  position: relative;
  background: #333333;
  border-radius: 4px;
  box-shadow: 0 0 30px rgba(0,0,0,0.6);
  margin-bottom: 20px;
`;

const Button = styled.div`
  margin: 10px;
  display: inline-block;
  background: #ffffff;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  &:hover {
    background: rgba(255,255,255,0.8);
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 40px;
  padding: 15px 0 20px 0;
`;


class Game extends Component {

  reset(simple) {
    this.props.resetGameAction(simple);
  }

  back() {
    this.props.moveBackAction();
  }

  save() {
    const { cells, saveAction } = this.props;
    const cellsStr = JSON.stringify(cells);
    saveAction(cellsStr);
  }

  restore() {
    this.props.restoreAction();
  }

  cellClick(item) {
    const cells = this.props.cells;
    const emptyOrder = cells.find(e => e.number === 16).order;
    const allows = [emptyOrder - 1, emptyOrder + 1, emptyOrder - 4, emptyOrder + 4];
    if (allows.indexOf(item.order) === -1) return false;
    this.props.moveCellAction(item, cells);
  }

  render() {
    const { winner, cells, history, saved } = this.props;

    return (
      <Wrap>
        { winner && <WinnerModal close={() => this.reset()} /> }
        <Title onClick={() => this.reset(true)}>Game 15</Title>
        <GameBox>
          {
            cells.map((item, i) => (
              <Cell
                key={i}
                top={item.x}
                left={item.y}
                size={100}
                number={item.number}
                clicked={() => this.cellClick(item)}
              />
            ))
          }
        </GameBox>
        <Button onClick={() => this.reset()}>Reset</Button>
        <Button onClick={() => this.save()}>Save</Button>
        { saved ? <Button onClick={() => this.restore()}>Restore</Button> : '' }
        { history.length ? <Button onClick={() => this.back()}>Back</Button> : '' }
      </Wrap>
    );
  }
}

const mapStateToProps = store => ({
  cells: store.cells,
  winner: store.winner,
  history: store.history,
  saved: store.saved,
});

const mapDispatchToProps = dispatch => ({
  moveCellAction: (item) => dispatch(moveCell(item)),
  resetGameAction: (simple) => dispatch(resetGame(simple)),
  moveBackAction: () => dispatch(moveBack()),
  saveAction: (cellsStr) => dispatch(saveCells(cellsStr)),
  restoreAction: () => dispatch(restoreCells()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);