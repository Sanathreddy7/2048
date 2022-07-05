import "./Modal.css";
import { useSpring, animated } from 'react-spring'

function Modal({title,textcolor,closeModal,setScore})
{
    const props = useSpring({ to: { opacity: 1,marginTop:0}, from: { opacity: 0,marginTop:-500 } });
    return(
        <div className="modalwrapper">
            <animated.div className="modal" style={props}>
                <div>
                    <h1 className={textcolor}>{title}</h1>
                </div>
                <div className="footer">
                    <button onClick={()=>{
                        closeModal(false);
                        setScore(0);
                    }}>New game</button>
                </div>
            </animated.div>
        </div>
    );
}

export default Modal;