import React, {useState} from 'react'; 
import {FaUntappd} from 'react-icons/fa'; 
import { Button } from '../component/scroll'; 

const ScrollButton = () =>{ 

const [visible, setVisible] = useState(false) 

const toggleVisible = () => { 
	const scrolled = document.documentElement.scrollTop; 
	if (scrolled > 400){ 
	setVisible(true) 
	} 
	else if (scrolled <= 400){ 
	setVisible(false) 
	} 
}; 

const scrollToTop = () =>{ 
	window.scrollTo({ 
	top: 0, 
	behavior: 'smooth'
	}); 
}; 

window.addEventListener('scroll', toggleVisible); 

return ( 
	<Button> 
	<FaUntappd onClick={scrollToTop} 
	style={{display: visible ? 'inline' : 'none'}} /> 
	</Button> 
); 
} 

export default ScrollButton; 
