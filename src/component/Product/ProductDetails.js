import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProductDetails, getSingleProduct,newReview } from '../../actions/productActions';
import Carousel from "react-material-ui-carousel";
import { useParams } from 'react-router-dom';
import "./ProductDetails.css"
import ReactStars from "react-rating-stars-component";
import Loading from '../layout/Loader/Loading';   
import ReviewCard from './ReviewCard';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';
import {Dialog,DialogActions,DialogContent,DialogTitle,Button} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from '../../constants/productConstant';


const ProductDetails = () => {

  
  
    const [imageLoaded, setImageLoaded] = useState(false);
    const dispatch=useDispatch();                 
    const { product,loading,error } = useSelector(state => state.productDetails)
    const alert = useAlert();
    const [quantity,setQuantity] =useState(1);
    const { id } = useParams();
    

    
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");



    
  
    const { success, error: reviewError } = useSelector(
      (state) => state.newReview
    );
  
   
    const increaseQuantity = () =>{
      
      if(product.stocks <=quantity){
        return;
      } 
      
      const qt=quantity+1;
      setQuantity(qt);
 }


    const decreaseQuantity = () =>{
      if(quantity <=1){
        return;
      }
        const qt=quantity-1;
        setQuantity(qt);
    }

    const reviewSubmitHandler = () => {
      const myForm = new FormData();
  
      myForm.set("rating", rating);
      myForm.set("comment", comment);
      myForm.set("productId", id);
  
      dispatch(newReview(myForm));
  
      setOpen(false);

      
    };
  


    const addToCartHandler = () => {
      dispatch(addItemsToCart(id,quantity));
      alert.success("Item added to cart");
    }



    const options = {
      size: "large",
      value: product.ratings,
      readOnly: true,
      precision: 0.5,
    };
  

      const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
      };
    
    


   

    useEffect(() => {

      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
      if (reviewError) {
        alert.error(reviewError);
        dispatch(clearErrors());
      }

      if (success) {
        alert.success("Review Submitted Successfully");
        dispatch({ type: NEW_REVIEW_RESET });
      }

        dispatch(getProductDetails(id))
     
    }, [dispatch,id,error,alert, reviewError, success])


    const handleImageLoad = () => {
        setImageLoaded(true);
      };
    

  return (
<Fragment>

{
    loading ? <Loading /> 
  : product ?
(  <Fragment>

  <MetaData  title={`${product.name} -- ECOMMERCE`} />
  
  <div className='ProductDetails' >
     <div >
     {product.images && product.images[0] ? (
                  <img
                  className='productImage'
                    src={product.images[0].url}
                    alt={product.name}
                    onLoad={handleImageLoad}
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                  />
                ) : null}
     </div>

     <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
              <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity} >-</button>
                    <input readOnly type="number" value={quantity}  />
                    <button onClick={increaseQuantity} >+</button>
                  </div>
                  <button
                    disabled={product.stocks < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.stocks < 1 ? "redColor" : "greenColor"}>
                    {product.stocks < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
  </div>

      <h3 className='reviewsHeading' >REVIEWS</h3>

      <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

      {product.reviews && product.reviews[0] ? 
    (
      <div className='reviews' >
        {product.reviews && 
        product.reviews.map((review) => <ReviewCard review={review} />)
        }
      </div>
    ):null  
    
    }

</Fragment>
) : null
}

</Fragment>

   
  )
}

export default ProductDetails