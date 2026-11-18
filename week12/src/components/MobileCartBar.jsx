import { formatPrice } from '../utils/formatPrice.js';
import { Icon } from './Icon.jsx';

export function MobileCartBar({ itemCount, total, onOpen }) {
  if (itemCount === 0) return null;

  return (
    <div className="mobile-bar">
      <button type="button" className="mobile-bar__button" onClick={onOpen}>
        <span className="mobile-bar__icon">
          <Icon name="bag" />
          <span className="mobile-bar__count">{itemCount}</span>
        </span>
        <span className="mobile-bar__label">View bag</span>
        <span className="mobile-bar__total">{formatPrice(total)}</span>
      </button>
    </div>
  );
}
