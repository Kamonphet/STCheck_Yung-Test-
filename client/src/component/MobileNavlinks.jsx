import React from 'react'
import { Link } from 'react-scroll'

function MoblieNavlinks({setToggle, href, link}) {
  return (
    <li className='list-none cursor-pointer mr-8'>
      <Link to={href} spy={true} smooth={true} duration={500} offset={-50} className='font-bold transition-all duartion-300' 
      onClick={(prev)=> setToggle(!prev)}>{link}</Link>
    </li>
  )
}

export default MoblieNavlinks