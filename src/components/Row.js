import Cell from './Cell.js';
import "./Row.css";

function Row({ row }) {
    return (
        <tr>
            {row.map((cell, rowIndex) => {
                return <Cell key = {rowIndex}
                cellValue = {cell}/>})}
        </tr>
    );
}

export default Row;