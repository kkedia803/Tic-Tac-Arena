import Cell from './cell';
import React from 'react';

const Board = ({ board, handleClick }) => {
    return (
        <div className="board">
            {board.map((value, index) => (
                <Cell key={index} value={value} onClick={()=>handleClick(index)} />
            ))}
        </div>
    );
};

export default Board;