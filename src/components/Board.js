import Row from "./Row";
import "./Board.css"

function Board({board}) {
    
    return(
        <div>
            <table>
            {board.map((row,rowIndex)=>(
                <Row key={rowIndex} row={row}/>
            ))}
            </table>
        </div>
        
    );
}
export default Board;