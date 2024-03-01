import React from 'react';

import './Unauthorized.css';

interface NoPermissionType {
  className?: string;
}

const Unauthorized = (props: NoPermissionType) => {
  const { className } = props;

  return (
    <div className={`block text-center m-5 ${className}`}>
      <div className="centered inline-block w-80 py-2.5 px-4 bg-neutral-100">
        <h1>{'Unauthorized (401)'}</h1>
        <p>
          {
            'Through a series of highly sophisticated and complex algorithms, this system has determined that you are not presently authorized to use this system feature'
          }
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
