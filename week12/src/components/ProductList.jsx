import { ProductCard } from './ProductCard.jsx';

export function ProductList({ products, quantityOf, onAdd, onDecrease }) {
  return (
    <ul className="product-grid">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            quantity={quantityOf(product.id)}
            onAdd={onAdd}
            onDecrease={onDecrease}
          />
        </li>
      ))}
    </ul>
  );
}
