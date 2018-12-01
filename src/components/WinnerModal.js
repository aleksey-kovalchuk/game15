import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 1;
`;

const Modal = styled.div`
  width: 400px;
  background: #ffffff;
  border-radius: 4px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px 3px rgba(0,0,0,0.6);
`;

const Title = styled.div`
  font-size: 36px;
  text-align: center;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 24px;
  margin-bottom: 30px;
`;

const Button = styled.div`
  display: inline-block;
  padding: 10px 40px;
  border-radius: 4px;
  background: #333333;
  color: #ffffff;
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const WinnerModal = (props) => {
  return (
    <Wrap onClick={props.close}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>🎉 Congradulations 🎉</Title>
        <Text>You are a winner!</Text>
        <Button onClick={props.close}>Play again</Button>
      </Modal>
    </Wrap>
  );
}

WinnerModal.propTypes = {
  close: PropTypes.func
};

export default WinnerModal;