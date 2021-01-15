import React from 'react';

const MovieInfoPanel = ({ movie: { runtime, revenue, budget } }) => {
  const convertRuntime = () => {
    let hours = Math.floor(runtime / 60);
    let minutes = runtime - 60 * hours;

    hours = hours < 1 ? '' : `${hours}h`;
    minutes = minutes < 1 ? '' : `${minutes}m`;

    return `${hours} ${minutes}`;
  };

  const convertToUSD = (dollars) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return formatter.format(dollars).slice(0, -3);
  };
  return (
    <div className="movieinfo-panel">
      <div className="movieinfo-panel-group">
        <div>Runtime:</div>
        <div>{convertRuntime()}</div>
      </div>
      <div className="movieinfo-panel-group">
        <div>Box Office:</div>
        <div>{convertToUSD(revenue)}</div>
      </div>
      <div className="movieinfo-panel-group">
        <div>Budget:</div>
        <div>{convertToUSD(budget)}</div>
      </div>
    </div>
  );
};

export default MovieInfoPanel;
