import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Cell = styled.div`
  font-size: 22px;
  transition: all 0.1s ease-in;
  border-radius: 4px;
  background: #ffffff;
  border: 2px solid #333333;
  box-sizing: border-box;
  position: absolute;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  &:hover {
    background: rgba(255,255,255,0.9);
  }
`;

const CellComponent = (props) => {
  return (
    <Fragment>
      {
        props.number !== 16 ? (
          <Cell
            onClick={props.clicked}
            className={props.number === 16 ? 'dark' : ''}
            style={{ 'top': props.top, 'left': props.left, 'width': props.size + 'px', 'height': props.size + 'px' }}
          >
            { props.number }
          </Cell>
        ) : ''
      }
    </Fragment>
  );
}

CellComponent.propTypes = {
  top: PropTypes.number,
  left: PropTypes.number,
  size: PropTypes.number,
  number: PropTypes.number,
  clicked: PropTypes.func
};

export default CellComponent;