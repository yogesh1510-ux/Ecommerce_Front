import React, { Fragment } from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <Fragment>

      <h1 className="contact-heading">Contact Us</h1>

    
    <div className="contact-container">
        <div className="contact-form">
          <form
            action="https://formspree.io/f/xgejalyp"
            method="POST"
            className="contact-inputs">
            <input
              type="text"
              placeholder="username"
              name="username"
              required
              autoComplete="off"
            />

            <input
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="off"
              required
            />

            <textarea
              name="Message"
              cols="30"
              rows="10"
              required
              autoComplete="off"
              placeholder="Enter you message"></textarea>

            <input type="submit" value="send" />
          </form>
        </div>
      </div>

      </Fragment>
  );
};

export default Contact;
