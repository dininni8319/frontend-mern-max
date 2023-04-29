import React from 'react';
import { createContext } from 'react';

export const ConfigContext = createContext();

export function ConfigProvider(props) {
  const { 
    REACT_APP_BACKEND_URL_DEV,
    REACT_APP_BACKEND_URL_PROD,
    NODE_ENV,
    REACT_APP_PUBLIC_DEV,
    REACT_APP_PUBLIC_PROD
  } = process.env

  const api_url = {
    backend: 
      NODE_ENV === 'development' ?
      REACT_APP_BACKEND_URL_DEV :
      REACT_APP_BACKEND_URL_PROD,
    public: NODE_ENV === 'development' ?
      REACT_APP_PUBLIC_DEV :
      REACT_APP_PUBLIC_PROD
  };

  return (
    <ConfigContext.Provider value={{ api_url }}>
      {props.children}
    </ConfigContext.Provider>
  );
}
