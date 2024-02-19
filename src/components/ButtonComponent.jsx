import React from 'react';

const ButtonComponent = ({ option, onSelect }) => {
  return (
    <button onClick={() => onSelect(option)}>
      {option}
    </button>
  );
};

export default ButtonComponent;