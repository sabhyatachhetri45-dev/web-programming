import { LOW_STOCK_LIMIT } from '../data/store.js';
import { formatPrice } from '../utils/formatPrice.js';
import { Icon } from './Icon.jsx';
import { QuantityStepper } from './QuantityStepper.jsx';

export function ProductCard({ product, quantity, onAdd, onDecrease }) {
  const { name, category, detail, price, stock, badge, image, imageAlt } = product;
  const isInCart = quantity > 0;

  return (
    <article className="product-card" data-in-cart={isInCart}>
      <div className="product-card__media">
        <img src={image} alt={imageAlt} width="600" height="600" loading="lazy" decoding="async" />
        {badge && <span className="product-card__badge">{badge}</span>}
        {isInCart && (
          <span className="product-card__in-cart">
            <Icon name="check" />
            <span className="product-card__in-cart-label">In bag</span>
          </span>
        )}
      </div>

      <div className="product-card__body">
        <p className="product-card__category">{category}</p>
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__detail">{detail}</p>

        <div className="product-card__footer">
          <p className="product-card__price">{formatPrice(price)}</p>
          {stock <= LOW_STOCK_LIMIT && <p className="product-card__stock">Only {stock} left</p>}
        </div>

        {isInCart ? (
          <QuantityStepper
            label={name}
            quantity={quantity}
            max={stock}
            onIncrease={() => onAdd(product)}
            onDecrease={() => onDecrease(product)}
            size="large"
          />
        ) : (
          <button
            type="button"
            className="button button--primary button--block"
            onClick={() => onAdd(product)}
            aria-label={`Add ${name} to bag`}
          >
            <Icon name="plus" />
            Add to bag
          </button>
        )}
      </div>
    </article>
  );
}
