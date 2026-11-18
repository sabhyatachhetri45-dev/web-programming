import { useEffect, useRef } from 'react';
import { CartItem } from './CartItem.jsx';
import { CartSummary } from './CartSummary.jsx';
import { EmptyCart } from './EmptyCart.jsx';
import { Icon } from './Icon.jsx';
import { OrderConfirmation } from './OrderConfirmation.jsx';
import { ShippingProgress } from './ShippingProgress.jsx';

// On wide screens this is a sticky column; below 64rem it turns into a bottom-sheet drawer.
export function CartSidebar({
  cart,
  order,
  isDrawer,
  isOpen,
  onClose,
  onAdd,
  onDecrease,
  onRemove,
  onCheckout,
  onContinueShopping,
}) {
  const closeButtonRef = useRef(null);
  const isModal = isDrawer && isOpen;
  const isEmpty = cart.items.length === 0;

  useEffect(() => {
    if (!isModal) return undefined;

    closeButtonRef.current?.focus();
    document.documentElement.classList.add('is-scroll-locked');

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.documentElement.classList.remove('is-scroll-locked');
    };
  }, [isModal, onClose]);

  return (
    <>
      {isModal && <div className="drawer-backdrop" onClick={onClose} aria-hidden="true" />}

      <aside
        id="cart-panel"
        className="cart"
        data-drawer={isDrawer}
        data-open={isOpen}
        tabIndex={-1}
        aria-labelledby="cart-title"
        role={isModal ? 'dialog' : undefined}
        aria-modal={isModal || undefined}
        inert={isDrawer && !isOpen}
      >
        <header className="cart__header">
          <div>
            <h2 className="cart__title" id="cart-title">
              Your bag
            </h2>
            <p className="cart__meta">
              {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'}
            </p>
          </div>

          <div className="cart__header-actions">
            {!isEmpty && (
              <button type="button" className="text-button" onClick={cart.clearCart}>
                Clear all
              </button>
            )}
            {isDrawer && (
              <button
                ref={closeButtonRef}
                type="button"
                className="icon-button"
                onClick={onClose}
                aria-label="Close bag"
              >
                <Icon name="close" />
              </button>
            )}
          </div>
        </header>

        {renderBody()}
      </aside>
    </>
  );

  function renderBody() {
    if (order && isEmpty) {
      return <OrderConfirmation order={order} onContinue={onContinueShopping} />;
    }

    if (isEmpty) {
      return <EmptyCart onBrowse={onClose} isDrawer={isDrawer} />;
    }

    return (
      <>
        <ShippingProgress subtotal={cart.subtotal} amountToFreeShipping={cart.amountToFreeShipping} />

        <ul className="cart__items" aria-label="Items in your bag">
          {cart.items.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onIncrease={onAdd}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />
          ))}
        </ul>

        <CartSummary
          subtotal={cart.subtotal}
          shipping={cart.shipping}
          total={cart.total}
          onCheckout={onCheckout}
        />
      </>
    );
  }
}
