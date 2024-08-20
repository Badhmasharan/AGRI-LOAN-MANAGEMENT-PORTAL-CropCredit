import React from 'react'
import { useNavigate } from "react-router-dom";
import './ApplyNowMenu.css'
const ApplyNowMenu = () => {
    const navigate = useNavigate();
    const handleApplyloan=()=>{
            navigate('/apply');
    }
  return (
    <div className='apply-now-menu' >
        <div className="triangle"></div>
        <ul >
            <li onClick={handleApplyloan}>Crop Loan</li>
            <li onClick={handleApplyloan}>Digital Gold Loan</li>
            <li onClick={handleApplyloan}>Agri Credit Card</li>
            <li onClick={handleApplyloan}>Farm Mechanisation Loan</li>
        </ul>
    </div>
  )
}

export default ApplyNowMenu;