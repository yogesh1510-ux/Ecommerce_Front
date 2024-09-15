import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProducts } from '../../actions/productActions';
import { useAlert } from 'react-alert';
import Loading from '../layout/Loader/Loading';
import ProductCard from '../Home/ProductCard';
import "./Products.css"
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from '../layout/MetaData';


const Products = () => {

  const dispatch =useDispatch();
  const {loading,products,productCount,error,resultPerPage,filterProductCount} = useSelector((state) => state.products) ;
  const alert = useAlert();
  const { keyword } = useParams();

  const [currentPage, setcurrentPage] = useState(1);
  const [ratings, setRatings] = useState(0);
  const [category, setcategory] = useState("");

  const [price, setPrice] = useState([0,25000])
  const count=filterProductCount;

  const categories =[
    "All",
    "Laptop",
    "Footwear",
    "Attire",
    "Camera",
    "SmartPhones"
  ];

  const handleCategory = (cataory) =>{
    setcurrentPage(1);
    setcategory(cataory);
  }


  const priceHnadler = (event,newPrice) =>{
      setPrice(newPrice);
  }

  const setCurrentPageNo = (e) =>{
    setcurrentPage(e);
  }
 

    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
      

      dispatch(getProducts(keyword,currentPage,price,category,ratings));
    
    }, [alert,error,keyword,dispatch,currentPage,price,category,ratings])
    



  return (
  
    <Fragment>
      {
        loading ? <Loading /> 
        :(
          <Fragment>
            <MetaData title="PRODUCTS -- ECOMMERCE" />

            <h2 className='productsHeading' >Products</h2>

            <div className='products' >
                {
                  products && 
                  products.map((product) => (
                    <ProductCard product={product} key={product._id} />
                  ) )
                }
            </div>

            <div className='filterbox' >
                <Typography>Price</Typography>
                <Slider 
                value={price}
                onChange={priceHnadler}
                min={0}
                aria-labelledby='range-slider'
                valueLabelDisplay='auto'
                max={25000}
                />
                <Typography>categories</Typography>
                <ul className='categoryBox' >
                  
                  {categories.map((categori) => (
                    <li
                    className={`cataory-link ${categori === category ? 'selected' : ''}`}
                    key={categori}
                    onClick={()=> handleCategory(categori)}
                    >
                      {categori}
                      </li>
                  ))}

                </ul>

                <fieldset>
                  <Typography component="legend" >Ratings Above</Typography>
                  <Slider
                  value={ratings}
                  min={0}
                  max={5}
                  valueLabelDisplay='auto'
                  aria-label='continuous-slider'
                  onChange={(e,newRatings) => {
                    setRatings(newRatings)
                  }}
                  />

                </fieldset>
            </div>

                        
          


           

            {
              resultPerPage < count &&
              <div className='paginationBox' >
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="next"
                prevPageText="prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkActive'
              />

            </div>

            }

         

            </Fragment>
        )
      }
    </Fragment>
  )
}

export default Products