import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; 
import store from './store'; 
import { positions,transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import App from './App';
import {disableReactDevTools} from "@fvilers/disable-react-devtools";


if(process.env.NODE_ENV ==='production') disableReactDevTools();

const options={
  timeout:5000,
  position:positions.BOTTOM_CENTER,
  transitions:transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Provider store={store}> 
    <AlertProvider template={AlertTemplate} {...options} >
      <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);
