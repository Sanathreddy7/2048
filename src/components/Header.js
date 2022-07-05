import './Header.css'
import { useSpring, animated } from 'react-spring'


function Header({ title}) {
    const props = useSpring({ to: { opacity: 1 ,marginTop:0}, from: { opacity: 0 ,marginTop:-1000} })
    
    return (
        <animated.div style={props} className='header'>
        <h1 className='title'> { title } </h1>
        </animated.div>
    );
}

export default Header;