import React, { Fragment,useEffect } from "react";
import { CgMouse } from 'react-icons/cg';
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProducts } from "../../actions/productActions";
import Loading from "../layout/Loader/Loading";
import { useAlert } from "react-alert";
import f1 from "../../images/features/f1.png";
import f2 from "../../images/features/f2.png";
import f3 from "../../images/features/f3.png";
import f4 from "../../images/features/f4.png";
import f5 from "../../images/features/f5.png";
import f6 from "../../images/features/f6.png";
import { useNavigate } from "react-router-dom";

// const product={
//   name:"orange t-shirt",
//   images:[{ url:"https://i.ibb.co/DRST11n/1.webp"}],
//   price:"₹4000",
//   _id:"yogesh"
// }

const Home = () => {

  const alert=useAlert();

  const dispatch=useDispatch();

  const {loading,products,error} = useSelector(state=> state.products);
  const navigate=useNavigate();

  const goShoping = () =>{
      navigate("/products");
  }

  useEffect(() => {
    
    if(error){
      alert.error(error);
        dispatch(clearErrors());
    }


  dispatch(getProducts())
    
  }, [dispatch,error,alert])
  

  return (
    <Fragment>

      {loading ? <Loading />
    :
    (
      <div className="home-section">
   
      <MetaData title="ECOMMRCE" />
   
       {/* <div className="banner">
         <p>Welcome to Ecommerce</p>
         <h1>FIND AMAZING PRODUCTS BELOW</h1>
   
         <a href="#container">
           <button>
             Scroll <CgMouse />
           </button>
         </a>
       </div> */}

       <div className="heroSection">
        <h4>Trade-in-Offer</h4>
        <h2>Super value Deals</h2>
        <h1>On All Products</h1>
        <p>Save more with coupons and up to 70% off! </p>
        <button onClick={()=> goShoping()}>Shop Now</button>

       </div>

       <div className="feature-section">

        <div className="fa-box">
        <img src={f1} alt="Description" />
          <p>Free Shopping</p>
        </div>

        <div className="fa-box">
        <img src={f2} alt="Description" />
          <p>Online Order</p>
        </div>

        <div className="fa-box">
        <img src={f3} alt="Description" />
          <p>Save Money</p>
        </div>

        <div className="fa-box">
        <img src={f4} alt="Description" />
          <p>Promotions</p>
        </div>

        <div className="fa-box">
        <img src={f5} alt="Description" />
          <p>Happy Sell</p>
        </div>

        <div className="fa-box">
        <img src={f6} alt="Description" />
          <p>24/7 Support</p>
        </div>

       </div>
   
       <h1 className="homeHeading">Featured Products</h1>
   
       <div className="container" id="container">
     
       { products && products.map((product)=><ProductCard product={product}  />
       )}
       
   
       </div>
   
       
     </div>
    )  
    
    
    }



   

  </Fragment>
  )
}

export default Home