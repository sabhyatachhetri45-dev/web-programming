export function EmptyCart({ onBrowse, isDrawer }) {
  return (
    <div className="cart-state">
      <svg className="cart-state__art" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="52" className="cart-state__halo" />
        <path d="M36 46h48l-4 42H40l-4-42Z" className="cart-state__bag" />
        <path d="M48 46v-4a12 12 0 0 1 24 0v4" className="cart-state__handle" />
        <path d="M54 66c2 3 10 3 12 0" className="cart-state__handle" />
      </svg>
      <h3 className="cart-state__title">Your bag is empty</h3>
      <p className="cart-state__copy">Start with a bestseller — the pastel highlighters are a small joy.</p>
      {isDrawer && (
        <button type="button" className="button button--secondary" onClick={onBrowse}>
          Browse products
        </button>
      )}
    </div>
  );
}
