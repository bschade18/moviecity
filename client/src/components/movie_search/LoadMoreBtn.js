import '../../styles/LoadMoreBtn.css';
import React from 'react';

const LoadMoreBtn = ({ text, callback }) => (
  <button className="load-more-btn" type="button" onClick={callback}>
    {text}
  </button>
);

export default LoadMoreBtn;
