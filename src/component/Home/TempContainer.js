import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from '../Cart/Payment';

const TempContainer = () => {

    const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const config = {
      withCredentials: true, 
    };
    
    const { data } = await axios.get("https://ecommerce-website-nuyo.onrender.com/api/v1/stripeapikey",config);

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    // WebFont.load({
    //   google: {
    //     families: ["Roboto", "Droid Sans", "Chilanka"],
    //   },
    // });

    // store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Elements stripe={loadStripe(stripeApiKey)}>
        {stripeApiKey && 
        <Payment/>
        
        }

    </Elements>
  )
}

export default TempContainer