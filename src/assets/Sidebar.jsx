import React from 'react'
import { FaBox, FaChartBar, FaDashcube, FaShoppingCart, FaUser } from 'react-icons/fa'
import { SlSettings } from 'react-icons/sl'

const Sidebar = () => {
  return (
    <>
        <div className="sidebar"> 
            <h2>Inventory Pro</h2>   
            <ul>  
                <li> <FaDashcube/> Dashboard </li>  
                <li> <FaBox/> Products </li>  
                <li> <FaShoppingCart/> Orders </li>  
                <li> <FaUser/> Customers </li>  
                <li> <FaChartBar/> Analytics </li>  
                <li> <SlSettings/> Settings </li>  
            </ul>  
        </div>  
    </>
  )
}

export default Sidebar