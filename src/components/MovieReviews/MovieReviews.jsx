import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div>
      <RotatingLines
        type="RotatingLines"
        color="#00BFFF"
        height={80}
        width={80}
      />
    </div>
  );
};

export default Loader;
