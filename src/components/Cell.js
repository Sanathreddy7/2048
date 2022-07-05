import "./Cell.css";
import { useSpring, animated } from 'react-spring'

function Cell({cellValue}){
    let color='cell';
    let value=(cellValue===0)?'':cellValue;

    if(value){
        color=`color-${value}`
    }


    const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

    return (
        <td >
          <div className={color}>
            <animated.div className="number" style={props}>{value}</animated.div>
          </div>
        </td>
      );
}

export default Cell;