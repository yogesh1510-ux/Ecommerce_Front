// About.js

import React from "react";
import "./aboutSection.css";
import img from "../../../images/about.jpg"

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/meabhisingh";
  };

  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h2>About</h2>
        <div className="about-container">

        <div>
              
              <img
                src={img}
                alt="About Us"
                className="about-us-image"
              />
              </div>
          <div>

          <p>
          Welcome to Ecommerce, where your online shopping experience comes to
          life. We are dedicated to providing you with a diverse selection of
          high-quality products, ensuring that your every purchase exceeds
          expectations.
        </p>
        <p>
          Our commitment goes beyond just delivering products. We strive to
          create a seamless journey for our customers, offering excellent
          customer service and ensuring that your needs are met with utmost
          satisfaction.
        </p>
      
        <p>
          Feel free to explore our diverse product range, and should you have
          any inquiries, our dedicated customer support team is always here to
          assist you. Thank you for choosing Ecommerce for all your online
          shopping needs.
        </p>
     

          </div>

      

        </div>
     
      </div>
    </div>
  );
};

export default About;
