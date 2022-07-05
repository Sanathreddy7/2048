import "./Score.css"

const Score = function({score})
{
    return(
        <div className="scorewrapper">
            <div className="scoretitle">Score</div>
            <div className="score">{score}</div>
        </div>
    );
}
export default Score;