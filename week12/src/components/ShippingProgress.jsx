import { FREE_SHIPPING_THRESHOLD } from '../data/store.js';
import { formatPrice } from '../utils/formatPrice.js';
import { Icon } from './Icon.jsx';

export function ShippingProgress({ subtotal, amountToFreeShipping }) {
  const isUnlocked = amountToFreeShipping === 0;

  return (
    <div className="shipping" data-unlocked={isUnlocked}>
      <p className="shipping__message">
        <Icon name={isUnlocked ? 'check' : 'truck'} />
        {isUnlocked ? (
          <span>You’ve unlocked free shipping.</span>
        ) : (
          <span>
            Add <strong>{formatPrice(amountToFreeShipping)}</strong> more for free shipping.
          </span>
        )}
      </p>
      {/* Native <progress> gives screen readers the value for free and avoids inline width styles. */}
      <progress
        className="shipping__bar"
        max={FREE_SHIPPING_THRESHOLD}
        value={Math.min(subtotal, FREE_SHIPPING_THRESHOLD)}
        aria-label="Progress towards free shipping"
      />
    </div>
  );
}
