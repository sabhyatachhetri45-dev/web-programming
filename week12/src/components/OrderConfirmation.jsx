import { formatPrice } from '../utils/formatPrice.js';
import { Icon } from './Icon.jsx';

export function OrderConfirmation({ order, onContinue }) {
  return (
    <div className="cart-state" role="status">
      <span className="cart-state__success">
        <Icon name="check" />
      </span>
      <h3 className="cart-state__title">Order placed — thank you!</h3>
      <p className="cart-state__copy">
        {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'} · {formatPrice(order.total)}
        <br />
        Order <strong>{order.number}</strong>
      </p>
      <button type="button" className="button button--secondary" onClick={onContinue}>
        Continue shopping
      </button>
    </div>
  );
}
