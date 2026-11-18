import { FREE_SHIPPING_THRESHOLD } from '../data/store.js';
import { formatPrice } from '../utils/formatPrice.js';
import { Icon } from './Icon.jsx';

export function StoreHeader({ itemCount, onOpenCart, isInert }) {
  return (
    <header className="store-header" inert={isInert}>
      <div className="store-header__inner">
        <a className="brand" href="#top" aria-label="Dalbit home">
          <Icon name="moon" className="brand__mark" />
          <span className="brand__word">dalbit</span>
          <span className="brand__sub">desk &amp; paper goods</span>
        </a>

        <p className="store-header__promo">
          <Icon name="truck" />
          Free shipping over {formatPrice(FREE_SHIPPING_THRESHOLD)}
        </p>

        <button
          type="button"
          className="header-cart"
          onClick={onOpenCart}
          aria-label={`Open bag, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
        >
          <Icon name="bag" />
          <span className="header-cart__label">Bag</span>
          {/* Keyed on the count so the bump animation replays on every change. */}
          <span key={itemCount} className="header-cart__count" data-empty={itemCount === 0}>
            {itemCount}
          </span>
        </button>
      </div>
    </header>
  );
}
