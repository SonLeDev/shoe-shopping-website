import React from 'react';
import data from '../../data.json';

export default (props) => {
  return (
    <div>
      <div className="products-heading-container">
        <img 
          src={props.panoImageURL} 
          className="products-heading-picture" 
          alt="products-header-pano"
        />
        <div className="products-picture-text-container text-center">
          <p className="products-picture-text lobster">{props.categoryName}</p>
        </div>
      </div>
    </div>
  );
}
