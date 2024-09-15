import React, { Fragment, useState } from 'react'
import {ReactNavbar} from "overlay-navbar"
import logo from "../../../../src/images/logo.png";
import { BsSearch } from 'react-icons/bs';
import { CgProfile } from "react-icons/cg"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { FaBars } from "react-icons/fa6";
import "./Header.css";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';


const Header = () => {

  const [mobileNavOpen,setMobileNavOpen] =useState(false);
  const { cartItems } = useSelector((state)=> state.cart );

  const toggleMobileNav = () =>{
    setMobileNavOpen((prev) => !prev);
  }

  const mobileNavClass= mobileNavOpen ? "open" : "";



  return (
    

    <Fragment >
      <div className='headerval'>

     
   

      <label className='logo'>Ecommerce</label>

      <div>

      

      <ul className={`navBar ${mobileNavClass}`}>
      <li className='hideCloseBar' onClick={toggleMobileNav} ><IoCloseOutline /></li>
       <li> <a href='/' >Home</a></li> 
        <li> <a href="/products" >Product</a></li> 
        <li> <a href='/contacts' >Contact</a></li> 
        <li> <a href='/about' >About</a></li> 
        <li> <a href='/Search' className='myIcons' > <BsSearch/> </a></li> 
        <li> <a href='/Cart' className='myIcons ' > <AiOutlineShoppingCart/> {cartItems.length > 0 && <span className="item-count">({cartItems.length})</span>}</a></li> 
        <li> <a href='/account' className='myIcons'  > <CgProfile/> </a></li> 

      


       </ul>



       </div>

        <div className='mobile' onClick={toggleMobileNav} >
        <i id='bar' > <FaBars/> </i>
        </div>
      
       
      
      </div>
    </Fragment>
  )
}

export default Header