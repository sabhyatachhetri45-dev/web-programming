import { formatPrice } from '../utils/formatPrice.js';
import { QuantityStepper } from './QuantityStepper.jsx';

export function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const { product, quantity, lineTotal } = item;

  return (
    <li className="cart-item">
      <img
        className="cart-item__image"
        src={product.image}
        alt=""
        width="72"
        height="72"
        loading="lazy"
        decoding="async"
      />

      <div className="cart-item__info">
        <h3 className="cart-item__name">{product.name}</h3>
        <p className="cart-item__unit">{formatPrice(product.price)} each</p>
        <QuantityStepper
          label={product.name}
          quantity={quantity}
          max={product.stock}
          onIncrease={() => onIncrease(product)}
          onDecrease={() => onDecrease(product)}
        />
      </div>

      {/* Remove sits apart from the stepper on purpose — close together they cause accidental removals. */}
      <div className="cart-item__side">
        <p className="cart-item__total">{formatPrice(lineTotal)}</p>
        <button
          type="button"
          className="text-button text-button--quiet"
          onClick={() => onRemove(product)}
          aria-label={`Remove ${product.name} from bag`}
        >
          Remove
        </button>
      </div>
    </li>
  );
}
