import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ShoppingCart } from './components/ShoppingCart.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShoppingCart />
  </StrictMode>
);
