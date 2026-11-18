import { Icon } from './Icon.jsx';

// At quantity 1 the minus button becomes a bin, so it is obvious the next tap removes the item.
export function QuantityStepper({ label, quantity, max, onIncrease, onDecrease, size = 'small' }) {
  const isAtMax = quantity >= max;
  const willRemove = quantity === 1;

  return (
    <div className={`stepper stepper--${size}`} role="group" aria-label={`Quantity of ${label}`}>
      <button
        type="button"
        className="stepper__button"
        onClick={onDecrease}
        aria-label={willRemove ? `Remove ${label} from bag` : `Decrease quantity of ${label}`}
      >
        <Icon name={willRemove ? 'trash' : 'minus'} />
      </button>
      <output className="stepper__value" aria-live="polite">
        {quantity}
      </output>
      <button
        type="button"
        className="stepper__button"
        onClick={onIncrease}
        disabled={isAtMax}
        aria-label={`Increase quantity of ${label}`}
        title={isAtMax ? `Only ${max} in stock` : undefined}
      >
        <Icon name="plus" />
      </button>
    </div>
  );
}
