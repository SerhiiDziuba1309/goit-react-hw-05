import React from 'react';
import s from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  return <p className={s.message}>{message}</p>;
};

export default ErrorMessage;
