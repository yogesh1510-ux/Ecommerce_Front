import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Search.css';

const Search = () => {
  const navigate = useNavigate(); 

  const [keyword, setKeyword] = useState('');

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products/${keyword}`); 
    } else {
      navigate('/products');
    }
  };

  return (
    <Fragment>
      <form className="searchbox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search for Product....."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    </Fragment>
  );
};

export default Search;
