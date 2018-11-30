import React, { Fragment } from 'react';
import styled from 'styled-components';

const Cell = styled.div`
  transition: all 0.1s ease-in;
  border-radius: 4px;
  background: #ffffff;
  border: 1px solid red;
  box-sizing: border-box;
  position: absolute;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgba(255,255,255,0.9);
  }
`;

export default function (props) {
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