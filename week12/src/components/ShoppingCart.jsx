import { useCallback, useState } from 'react';
import { CATEGORIES, PRODUCTS } from '../data/products.js';
import { useCart } from '../hooks/useCart.js';
import { useMediaQuery } from '../hooks/useMediaQuery.js';
import { CartSidebar } from './CartSidebar.jsx';
import { MobileCartBar } from './MobileCartBar.jsx';
import { ProductList } from './ProductList.jsx';
import { ProductToolbar } from './ProductToolbar.jsx';
import { ReactExercises } from './ReactExercises.jsx';
import { StoreFooter } from './StoreFooter.jsx';
import { StoreHeader } from './StoreHeader.jsx';
import { StoreIntro } from './StoreIntro.jsx';
import { UndoToast } from './UndoToast.jsx';

const SORTERS = {
  featured: () => 0,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
};

// Every piece of cart state lives here (lifted up) so the product grid and the cart panel,
// which are siblings, always read from the same source of truth.
export function ShoppingCart() {
  const cart = useCart();
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const [announcement, setAnnouncement] = useState('');
  const isDesktop = useMediaQuery('(min-width: 64rem)');
  // While the mobile drawer is open, everything behind it is inert so focus can't wander off.
  const isPageInert = isCartOpen && !isDesktop;

  // Stable identity matters: the drawer's focus/Escape effect depends on it and would
  // otherwise re-run (and steal focus) on every cart change.
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const visibleProducts = PRODUCTS.filter(
    (product) => category === 'All' || product.category === category
  ).toSorted(SORTERS[sortBy]);

  const categoryCounts = Object.fromEntries(
    CATEGORIES.map((name) => [
      name,
      name === 'All' ? PRODUCTS.length : PRODUCTS.filter((product) => product.category === name).length,
    ])
  );

  function handleAdd(product) {
    setOrder(null);
    cart.addItem(product.id);
    setAnnouncement(`${product.name} added to your bag.`);
  }

  function handleDecrease(product) {
    cart.decreaseItem(product.id);
    setAnnouncement(`${product.name} quantity updated.`);
  }

  function handleRemove(product) {
    cart.removeItem(product.id);
    setAnnouncement(`${product.name} removed from your bag.`);
  }

  function handleCheckout() {
    // A fake order number is plenty for a demo store — nothing is sent anywhere.
    setOrder({
      number: `DLB-${Math.floor(100000 + Math.random() * 900000)}`,
      itemCount: cart.itemCount,
      total: cart.total,
    });
    cart.emptyAfterCheckout();
  }

  function handleOpenCart() {
    if (isDesktop) {
      document.getElementById('cart-panel')?.focus();
      return;
    }
    setIsCartOpen(true);
  }

  return (
    <div className="store">
      <a className="skip-link" href="#products">
        Skip to products
      </a>

      <StoreHeader itemCount={cart.itemCount} onOpenCart={handleOpenCart} isInert={isPageInert} />

      <main className="store-main">
        <StoreIntro isInert={isPageInert} />

        <div className="store-layout">
          <section
            className="catalogue"
            id="products"
            aria-labelledby="catalogue-title"
            inert={isPageInert}
          >
            <ProductToolbar
              categories={CATEGORIES}
              categoryCounts={categoryCounts}
              activeCategory={category}
              onCategoryChange={setCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              resultCount={visibleProducts.length}
            />
            <ProductList
              products={visibleProducts}
              quantityOf={cart.quantityOf}
              onAdd={handleAdd}
              onDecrease={handleDecrease}
            />
          </section>

          <CartSidebar
            cart={cart}
            order={order}
            isDrawer={!isDesktop}
            isOpen={isCartOpen}
            onClose={closeCart}
            onAdd={handleAdd}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
            onCheckout={handleCheckout}
            onContinueShopping={() => {
              setOrder(null);
              setIsCartOpen(false);
            }}
          />
        </div>

        <ReactExercises />
      </main>

      <StoreFooter isInert={isPageInert} />

      {!isDesktop && (
        <MobileCartBar itemCount={cart.itemCount} total={cart.total} onOpen={() => setIsCartOpen(true)} />
      )}

      {cart.undoMessage && (
        <UndoToast
          key={cart.undoId}
          message={cart.undoMessage}
          onUndo={cart.undo}
          onDismiss={cart.dismissUndo}
        />
      )}

      <p className="visually-hidden" role="status" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}
