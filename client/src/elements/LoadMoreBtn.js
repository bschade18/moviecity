import React from "react";

const LoadMoreBtn = ({ text, callback }) => (
  <div>
    <button className="load-more-btn" type="button" onClick={callback}>
      {text}
    </button>
  </div>
);

export default LoadMoreBtn;
