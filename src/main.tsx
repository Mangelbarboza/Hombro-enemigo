import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './SocialApp';
import './style.css';
const primaryHost='hombro-enemigo.vercel.app';
if(location.hostname.endsWith('.vercel.app')&&location.hostname!==primaryHost){location.replace(`https://${primaryHost}${location.pathname}${location.search}${location.hash}`);}else{ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);}
