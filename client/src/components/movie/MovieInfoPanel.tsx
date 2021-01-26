import React from 'react';


interface MovieInfoPanelProps {
  movie: {
    runtime: number,
    revenue: number,
    budget: number
  }
}

const MovieInfoPanel = ({ movie: { runtime, revenue, budget } } : MovieInfoPanelProps) => {
  const convertRuntime = () => {
    let hours = Math.floor(runtime / 60);
    let minutes = runtime - 60 * hours;

    // @ts-ignore
    hours = hours < 1 ? '' : `${hours}h`;
     // @ts-ignore
    minutes = minutes < 1 ? '' : `${minutes}m`;

    return `${hours} ${minutes}`;
  };

  const convertToUSD = (dollars: number) => {
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
