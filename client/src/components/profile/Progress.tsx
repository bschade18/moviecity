import React from 'react';

interface ProgressProps {
  percentage: number
}

const Progress = ({ percentage } : ProgressProps ) => (
  <div className="progress">
    <div
      className="progress-bar progress-bar-striped bg-success"
      role="progressbar"
      style={{ width: `${percentage}%` }}
    >
      {percentage}%
    </div>
  </div>
);


export default Progress;
