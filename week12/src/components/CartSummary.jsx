import { formatPrice } from '../utils/formatPrice.js';

export function CartSummary({ subtotal, shipping, total, onCheckout }) {
  return (
    <div className="summary">
      <dl className="summary__rows">
        <div className="summary__row">
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div className="summary__row">
          <dt>Shipping</dt>
          <dd>{shipping === 0 ? <span className="summary__free">Free</span> : formatPrice(shipping)}</dd>
        </div>
        <div className="summary__row summary__row--total">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>

      <button type="button" className="button button--primary button--block button--large" onClick={onCheckout}>
        Checkout · {formatPrice(total)}
      </button>
      <p className="summary__note">Demo store — no payment is taken.</p>
    </div>
  );
}
