import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

import './Spinner.css';

interface SpinnerType {
  className?: string;
  loading: boolean;
}

const Spinner = ({ className, loading }: SpinnerType) => {
  return (
    <div className={`container ${className}`}>
      <div className="center">
        <HashLoader loading={loading} />
      </div>
    </div>
  );
};

export default Spinner;
