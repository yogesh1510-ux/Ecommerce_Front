import React, { Fragment } from 'react';
import {SpeedDial,SpeedDialAction} from "@material-ui/lab";
import { useState } from 'react';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../actions/userActions';
import { Backdrop } from '@material-ui/core';
import "./Header.css";

const UserOptions = ({user}) => {

  const [open,setOpen] =useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate=useNavigate();

  const dispatch = useDispatch();

  const alert = useAlert();


  const options= [
    {icon:<ListAltIcon />, name:"Orders" , func: orders },
    {icon:<PersonIcon />, name:"Profile" , func: account },
    {icon:<ExitToAppIcon />, name:"Logout" , func: logoutUser },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    
  ];


  if(user.role==="admin"){
      options.unshift({
        icon:<DashboardIcon />, name:"Dashboard" , func: dashboard
       })
  }


function cart() {
  navigate("/cart")
}

function orders () {
  navigate("/orders");
}

function dashboard ()  {
    navigate("/admin/dashboard")
  };

  function account() {
    navigate("/account");
  };


  function logoutUser(){
    dispatch(logout());
    alert.success("Logout Successfully");
   // navigate("/login");
  }




  return (
    
   <Fragment>
    <Backdrop open={open} style={{zIndex:"10"}} />
    <SpeedDial
    ariaLabel='Speed Dial example'
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    style={{zIndex:"11"}}
    open={open}
    direction='down'
    className='speedDial'
    icon={
      <img
      className='speedDialIcon'
      src={user.avatar.url ? user.avatar.url : "/Profile.png"}
      alt='Profile'
      />

    }
    >

   {options.map((items) => (
    <SpeedDialAction key={items.name} icon={items.icon} tooltipTitle={items.name} onClick={items.func} tooltipOpen={window.innerWidth <= 600 ? true : false} />
   ) )}

    </SpeedDial>

    
    
   </Fragment>
  )
}

export default UserOptions